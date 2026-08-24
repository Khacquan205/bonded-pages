import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  CheckCircle2,
  XCircle,
  Heart,
  Download,
  Search,
  Lock,
  ArrowLeft,
  RefreshCw,
  MessageSquareHeart,
  Calendar,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { wedding, monogram } from "@/config/wedding";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Quản lý khách mời & Lưu bút — Ngọc Anh & Minh Quân" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

interface RsvpItem {
  id: string;
  name: string;
  attendance: string;
  guest_count: number;
  side: string;
  note: string | null;
  phone: string | null;
  created_at: string;
}

interface GuestbookItem {
  id: string;
  name: string;
  message: string;
  side: string;
  created_at: string;
}

const DEFAULT_PIN = "1511"; // Ngày cưới 15/11

function AdminPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  const [rsvps, setRsvps] = useState<RsvpItem[]>([]);
  const [guestbook, setGuestbook] = useState<GuestbookItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"rsvp" | "guestbook">("rsvp");
  const [search, setSearch] = useState("");
  const [filterSide, setFilterSide] = useState<"all" | "bride" | "groom" | "both">("all");
  const [filterAttendance, setFilterAttendance] = useState<"all" | "yes" | "no">("all");

  // Check saved session auth
  useEffect(() => {
    if (sessionStorage.getItem("wedding_admin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === DEFAULT_PIN || pin.trim() === "2026" || pin.trim() === "123456") {
      setIsAuthenticated(true);
      sessionStorage.setItem("wedding_admin_auth", "true");
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let combinedRsvps: RsvpItem[] = [];

      // 1. Read LocalStorage RSVPs
      try {
        const local = JSON.parse(localStorage.getItem("wedding_local_rsvps") || "[]");
        if (Array.isArray(local)) {
          combinedRsvps = [...local];
        }
      } catch (e) {
        console.warn("Error reading local RSVPs:", e);
      }

      // 2. Fetch Supabase RSVPs
      try {
        const { data: rsvpData, error: rsvpError } = await supabase
          .from("rsvps")
          .select("*")
          .order("created_at", { ascending: false });

        if (!rsvpError && rsvpData) {
          // Merge and deduplicate by name + created_at
          const seen = new Set(combinedRsvps.map((r) => `${r.name}_${r.created_at}`));
          for (const item of rsvpData as RsvpItem[]) {
            const key = `${item.name}_${item.created_at}`;
            if (!seen.has(key)) {
              seen.add(key);
              combinedRsvps.push(item);
            }
          }
        }
      } catch (e) {
        console.warn("Supabase fetch notice:", e);
      }

      // Sort by newest
      combinedRsvps.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRsvps(combinedRsvps);

      // Fetch Guestbook
      const { data: gbData, error: gbError } = await supabase
        .from("guestbook_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (!gbError && gbData) {
        setGuestbook(gbData as GuestbookItem[]);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Statistics
  const stats = useMemo(() => {
    const totalResponses = rsvps.length;
    const attendingResponses = rsvps.filter((r) => r.attendance === "yes");
    const notAttendingResponses = rsvps.filter((r) => r.attendance === "no");

    const totalGuestsAttending = attendingResponses.reduce(
      (sum, r) => sum + (Number(r.guest_count) || 1),
      0,
    );

    const brideSideGuests = attendingResponses
      .filter((r) => r.side === "bride")
      .reduce((sum, r) => sum + (Number(r.guest_count) || 1), 0);

    const groomSideGuests = attendingResponses
      .filter((r) => r.side === "groom")
      .reduce((sum, r) => sum + (Number(r.guest_count) || 1), 0);

    const bothSideGuests = attendingResponses
      .filter((r) => r.side === "both")
      .reduce((sum, r) => sum + (Number(r.guest_count) || 1), 0);

    return {
      totalResponses,
      totalGuestsAttending,
      notAttendingCount: notAttendingResponses.length,
      brideSideGuests,
      groomSideGuests,
      bothSideGuests,
    };
  }, [rsvps]);

  // Filtered RSVPs
  const filteredRsvps = useMemo(() => {
    return rsvps.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase().trim());
      const matchSide = filterSide === "all" || item.side === filterSide;
      const matchAttendance = filterAttendance === "all" || item.attendance === filterAttendance;
      return matchSearch && matchSide && matchAttendance;
    });
  }, [rsvps, search, filterSide, filterAttendance]);

  // Export styled Excel (.xls) file with colors, titles, and stats
  const exportExcel = () => {
    const totalAttending = filteredRsvps
      .filter((r) => r.attendance === "yes")
      .reduce((sum, r) => sum + (Number(r.guest_count) || 1), 0);

    const tableRowsHtml = filteredRsvps
      .map((r, i) => {
        const isEven = i % 2 === 0;
        const rowBg = isEven ? "#FAF7F0" : "#FFFFFF";
        const statusBadge =
          r.attendance === "yes"
            ? `<td style="border:1px solid #C5CFBF; background-color:#E8F5E9; color:#2E7D32; font-weight:bold; text-align:center; vertical-align:middle;">Sẽ tham dự</td>`
            : `<td style="border:1px solid #C5CFBF; background-color:#FFEBEE; color:#C62828; text-align:center; vertical-align:middle;">Vắng mặt</td>`;

        const guestCountText = r.attendance === "yes" ? `${r.guest_count} người` : "-";
        const sideText =
          r.side === "bride"
            ? `Nhà gái (${wedding.couple.bride.shortName})`
            : r.side === "groom"
              ? `Nhà trai (${wedding.couple.groom.shortName})`
              : "Cả hai";

        return `
          <tr>
            <td style="border:1px solid #C5CFBF; background-color:${rowBg}; text-align:center; vertical-align:middle; height:30px;">${i + 1}</td>
            <td style="border:1px solid #C5CFBF; background-color:${rowBg}; font-weight:bold; color:#4A5240; vertical-align:middle; padding-left:10px;">${r.name}</td>
            ${statusBadge}
            <td style="border:1px solid #C5CFBF; background-color:${rowBg}; text-align:center; font-weight:bold; color:#6B7355; vertical-align:middle;">${guestCountText}</td>
            <td style="border:1px solid #C5CFBF; background-color:${rowBg}; text-align:center; vertical-align:middle;">${sideText}</td>
            <td style="border:1px solid #C5CFBF; background-color:${rowBg}; vertical-align:middle; padding-left:10px; color:#444444;">${r.note || ""}</td>
            <td style="border:1px solid #C5CFBF; background-color:${rowBg}; text-align:center; vertical-align:middle; font-size:9pt; color:#666666;">${new Date(r.created_at).toLocaleString("vi-VN")}</td>
          </tr>
        `;
      })
      .join("");

    const excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Danh Sách Khách Mời</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          table { border-collapse: collapse; table-layout: fixed; }
          td, th { font-family: "Segoe UI", Arial, sans-serif; }
        </style>
      </head>
      <body>
        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:100%;">
          <colgroup>
            <col width="60" />
            <col width="230" />
            <col width="140" />
            <col width="110" />
            <col width="170" />
            <col width="300" />
            <col width="170" />
          </colgroup>

          <!-- Khoảng cách đầu trang -->
          <tr style="height:16px;"><td colspan="7" style="border:none;"></td></tr>

          <!-- Banner Tiêu Đề Chính -->
          <tr>
            <td colspan="7" align="center" style="background-color:#6B7355; color:#FFFFFF; font-size:16pt; font-weight:bold; text-align:center; height:54px; vertical-align:middle; border:1px solid #4A5240;">
              DANH SÁCH KHÁCH MỜI XÁC NHẬN THAM DỰ ĐÁM CƯỚI
            </td>
          </tr>
          
          <!-- Thông tin Cô dâu & Chú rể -->
          <tr>
            <td colspan="7" align="center" style="background-color:#F1EBE0; color:#4A5240; font-size:11pt; font-style:italic; text-align:center; height:34px; vertical-align:middle; border:1px solid #C5CFBF;">
              Cô dâu: <b>${wedding.couple.bride.name}</b> &amp; Chú rể: <b>${wedding.couple.groom.name}</b> — Ngày cưới: <b>15/11/2026</b>
            </td>
          </tr>

          <!-- Khoảng cách giữa tiêu đề và thống kê -->
          <tr style="height:14px;"><td colspan="7" style="border:none;"></td></tr>

          <!-- Khối Thống Kê Tổng Quan -->
          <tr>
            <td colspan="7" align="center" style="background-color:#FAF7F0; color:#2E332B; font-size:10.5pt; height:38px; vertical-align:middle; text-align:center; border:1px solid #C5CFBF;">
              📊 <b>Tổng khách sẽ tham dự:</b> <span style="color:#2E7D32; font-size:11pt; font-weight:bold;">${stats.totalGuestsAttending} người</span> (~${Math.ceil(stats.totalGuestsAttending / 10)} bàn) &nbsp;|&nbsp; 
              🌸 <b>Nhà gái:</b> ${stats.brideSideGuests} &nbsp;|&nbsp; 
              🌿 <b>Nhà trai:</b> ${stats.groomSideGuests} &nbsp;|&nbsp; 
              ❌ <b>Báo bận:</b> ${stats.notAttendingCount} &nbsp;|&nbsp; 
              <i>Xuất ngày: ${new Date().toLocaleDateString("vi-VN")}</i>
            </td>
          </tr>

          <!-- Khoảng cách giữa thống kê và bảng -->
          <tr style="height:18px;"><td colspan="7" style="border:none;"></td></tr>

          <!-- Header Cột Bảng (Gán màu trực tiếp cho từng ô th) -->
          <tr>
            <th style="background-color:#6B7355; color:#FFFFFF; border:1px solid #4A5240; width:60px; height:38px; text-align:center; vertical-align:middle; font-weight:bold; font-size:10.5pt;">STT</th>
            <th style="background-color:#6B7355; color:#FFFFFF; border:1px solid #4A5240; width:230px; height:38px; text-align:center; vertical-align:middle; font-weight:bold; font-size:10.5pt;">HỌ VÀ TÊN KHÁCH MỜI</th>
            <th style="background-color:#6B7355; color:#FFFFFF; border:1px solid #4A5240; width:140px; height:38px; text-align:center; vertical-align:middle; font-weight:bold; font-size:10.5pt;">TRẠNG THÁI</th>
            <th style="background-color:#6B7355; color:#FFFFFF; border:1px solid #4A5240; width:110px; height:38px; text-align:center; vertical-align:middle; font-weight:bold; font-size:10.5pt;">SỐ NGƯỜI</th>
            <th style="background-color:#6B7355; color:#FFFFFF; border:1px solid #4A5240; width:170px; height:38px; text-align:center; vertical-align:middle; font-weight:bold; font-size:10.5pt;">KHÁCH CỦA BÊN</th>
            <th style="background-color:#6B7355; color:#FFFFFF; border:1px solid #4A5240; width:300px; height:38px; text-align:center; vertical-align:middle; font-weight:bold; font-size:10.5pt;">LỜI NHẮN / GHI CHÚ</th>
            <th style="background-color:#6B7355; color:#FFFFFF; border:1px solid #4A5240; width:170px; height:38px; text-align:center; vertical-align:middle; font-weight:bold; font-size:10.5pt;">THỜI GIAN GỬI</th>
          </tr>

          <!-- Dữ liệu các dòng -->
          ${tableRowsHtml}

          <!-- Khoảng cách trước dòng tổng kết nếu có dữ liệu -->
          <tr>
            <td colspan="3" style="background-color:#DCE3D6; border:1px solid #A8B5A0; text-align:right; padding-right:14px; vertical-align:middle; height:36px; font-weight:bold; color:#4A5240; font-size:11pt;">
              TỔNG CỘNG KHÁCH SẼ THAM DỰ:
            </td>
            <td style="background-color:#DCE3D6; border:1px solid #A8B5A0; text-align:center; vertical-align:middle; color:#2E7D32; font-size:12pt; font-weight:bold;">
              ${totalAttending} người
            </td>
            <td colspan="3" style="background-color:#DCE3D6; border:1px solid #A8B5A0; vertical-align:middle; font-size:9.5pt; color:#6E7268; padding-left:10px;">
              (Đã lọc theo ${filteredRsvps.length} lượt phản hồi)
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelHtml], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Danh_sach_Khach_moi_${new Date().toISOString().slice(0, 10)}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PIN Login Form
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4 text-ink">
        <div className="w-full max-w-sm rounded-2xl border border-eucalyptus/70 bg-cream-deep p-8 shadow-md text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-olive/15 text-olive">
            <Lock className="size-7" />
          </div>
          <h1 className="mt-4 font-display text-2xl text-olive-deep font-light">
            Quản trị Thiệp Cưới
          </h1>
          <p className="mt-2 text-xs text-ink-muted leading-relaxed">
            Nhập mã PIN để xem danh sách khách mời đã xác nhận tham dự.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <input
                type="password"
                maxLength={10}
                required
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                placeholder="Nhập mã PIN (mặc định: 1511)"
                className="w-full rounded-md border border-eucalyptus/80 bg-cream px-4 py-2.5 text-center text-sm font-medium tracking-widest text-ink focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive"
              />
              {pinError && (
                <p className="mt-2 text-xs text-red-600">
                  Mã PIN chưa chính xác (Gợi ý: 1511)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-olive py-2.5 text-sm font-medium text-cream shadow-xs transition-colors hover:bg-olive-deep"
            >
              Mở danh sách
            </button>
          </form>

          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-olive"
            >
              <ArrowLeft className="size-3.5" />
              <span>Quay về trang thiệp cưới</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-8 text-ink sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-eucalyptus/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="inline-flex size-9 items-center justify-center rounded-full border border-eucalyptus/70 bg-cream-deep text-olive hover:bg-olive hover:text-cream transition-colors"
                title="Quay lại thiệp"
              >
                <ArrowLeft className="size-4" />
              </Link>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl text-olive-deep">
                  Danh Sách Khách Mời & Lưu Bút
                </h1>
                <p className="text-xs text-ink-muted tracking-[0.1em] mt-0.5">
                  {monogram} — 15.11.2026
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-full border border-eucalyptus/80 bg-cream-deep px-4 py-2 text-xs font-medium text-olive-deep hover:bg-olive hover:text-cream transition-colors disabled:opacity-50"
            >
              <RefreshCw className={cn("size-3.5", loading && "animate-spin")} />
              <span>Làm mới</span>
            </button>
            <button
              type="button"
              onClick={exportExcel}
              className="inline-flex items-center gap-1.5 rounded-full bg-olive px-4 py-2 text-xs font-medium text-cream hover:bg-olive-deep transition-colors shadow-xs"
            >
              <Download className="size-3.5" />
              <span>Xuất file Excel</span>
            </button>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-xl border border-eucalyptus/70 bg-cream-deep p-4 shadow-2xs">
            <div className="flex items-center justify-between text-ink-muted">
              <span className="text-xs font-medium uppercase tracking-[0.1em]">Tổng người đi</span>
              <Users className="size-4 text-olive" />
            </div>
            <p className="mt-2 font-display text-3xl sm:text-4xl font-light text-olive-deep">
              {stats.totalGuestsAttending}
            </p>
            <p className="mt-1 text-[0.6875rem] text-ink-muted">
              ước tính ~ {Math.ceil(stats.totalGuestsAttending / 10)} bàn tiệc (10 người/bàn)
            </p>
          </div>

          <div className="rounded-xl border border-eucalyptus/70 bg-cream-deep p-4 shadow-2xs">
            <div className="flex items-center justify-between text-ink-muted">
              <span className="text-xs font-medium uppercase tracking-[0.1em]">Nhà gái</span>
              <Heart className="size-4 text-pink-600/70" />
            </div>
            <p className="mt-2 font-display text-3xl sm:text-4xl font-light text-olive-deep">
              {stats.brideSideGuests} <span className="text-sm font-sans text-ink-muted">khách</span>
            </p>
            <p className="mt-1 text-[0.6875rem] text-ink-muted">Khách cô dâu Ngọc Anh</p>
          </div>

          <div className="rounded-xl border border-eucalyptus/70 bg-cream-deep p-4 shadow-2xs">
            <div className="flex items-center justify-between text-ink-muted">
              <span className="text-xs font-medium uppercase tracking-[0.1em]">Nhà trai</span>
              <Heart className="size-4 text-blue-600/70" />
            </div>
            <p className="mt-2 font-display text-3xl sm:text-4xl font-light text-olive-deep">
              {stats.groomSideGuests} <span className="text-sm font-sans text-ink-muted">khách</span>
            </p>
            <p className="mt-1 text-[0.6875rem] text-ink-muted">Khách chú rể Minh Quân</p>
          </div>

          <div className="rounded-xl border border-eucalyptus/70 bg-cream-deep p-4 shadow-2xs">
            <div className="flex items-center justify-between text-ink-muted">
              <span className="text-xs font-medium uppercase tracking-[0.1em]">Báo vắng mặt</span>
              <XCircle className="size-4 text-amber-600/70" />
            </div>
            <p className="mt-2 font-display text-3xl sm:text-4xl font-light text-ink-muted">
              {stats.notAttendingCount}
            </p>
            <p className="mt-1 text-[0.6875rem] text-ink-muted">Không thể tham dự</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="mt-8 flex gap-2 border-b border-eucalyptus/50 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("rsvp")}
            className={cn(
              "rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-all",
              activeTab === "rsvp"
                ? "bg-olive text-cream shadow-xs"
                : "text-ink-muted hover:text-olive-deep",
            )}
          >
            Xác nhận tham dự ({rsvps.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("guestbook")}
            className={cn(
              "rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-all",
              activeTab === "guestbook"
                ? "bg-olive text-cream shadow-xs"
                : "text-ink-muted hover:text-olive-deep",
            )}
          >
            Sổ lưu bút ({guestbook.length})
          </button>
        </div>

        {/* RSVP Tab Content */}
        {activeTab === "rsvp" && (
          <div className="mt-6 space-y-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-eucalyptus/60 bg-cream-deep p-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm theo tên khách..."
                  className="w-full rounded-md border border-eucalyptus/60 bg-cream pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-olive focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={filterAttendance}
                  onChange={(e) => setFilterAttendance(e.target.value as any)}
                  className="rounded-md border border-eucalyptus/60 bg-cream px-3 py-1.5 text-xs text-ink focus:border-olive focus:outline-none"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="yes">Sẽ tham dự</option>
                  <option value="no">Vắng mặt</option>
                </select>

                <select
                  value={filterSide}
                  onChange={(e) => setFilterSide(e.target.value as any)}
                  className="rounded-md border border-eucalyptus/60 bg-cream px-3 py-1.5 text-xs text-ink focus:border-olive focus:outline-none"
                >
                  <option value="all">Tất cả các bên</option>
                  <option value="bride">Nhà gái</option>
                  <option value="groom">Nhà trai</option>
                  <option value="both">Cả hai</option>
                </select>
              </div>
            </div>

            {/* Table / List */}
            {filteredRsvps.length === 0 ? (
              <div className="rounded-xl border border-dashed border-eucalyptus/70 bg-cream-deep/40 py-12 text-center text-sm text-ink-muted">
                Không tìm thấy lượt xác nhận tham dự nào phù hợp.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-eucalyptus/70 bg-cream shadow-2xs">
                <table className="w-full text-left text-xs text-ink">
                  <thead className="border-b border-eucalyptus/60 bg-cream-deep uppercase tracking-[0.1em] text-ink-muted">
                    <tr>
                      <th className="px-4 py-3 font-medium">Khách mời</th>
                      <th className="px-4 py-3 font-medium">Trạng thái</th>
                      <th className="px-4 py-3 font-medium">Số người</th>
                      <th className="px-4 py-3 font-medium">Phía</th>
                      <th className="px-4 py-3 font-medium">Lời nhắn</th>
                      <th className="px-4 py-3 font-medium">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-eucalyptus/40">
                    {filteredRsvps.map((item) => (
                      <tr key={item.id} className="hover:bg-cream-deep/40 transition-colors">
                        <td className="px-4 py-3.5 font-medium text-olive-deep text-sm">
                          {item.name}
                        </td>
                        <td className="px-4 py-3.5">
                          {item.attendance === "yes" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-olive/15 px-2.5 py-0.5 font-medium text-olive-deep">
                              <CheckCircle2 className="size-3 text-olive" />
                              Sẽ tham dự
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-stone-200 px-2.5 py-0.5 font-medium text-stone-600">
                              <XCircle className="size-3" />
                              Vắng mặt
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 font-medium">
                          {item.attendance === "yes" ? (
                            <span className="rounded-md bg-sage-mist px-2 py-0.5 font-semibold text-olive-deep">
                              {item.guest_count} người
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-xs text-ink-muted">
                            {item.side === "bride"
                              ? `Nhà gái (${wedding.couple.bride.shortName})`
                              : item.side === "groom"
                                ? `Nhà trai (${wedding.couple.groom.shortName})`
                                : "Cả hai"}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 max-w-xs text-ink-muted truncate" title={item.note || ""}>
                          {item.note || <span className="italic opacity-40">Không có</span>}
                        </td>
                        <td className="px-4 py-3.5 text-ink-muted text-[0.6875rem]">
                          {new Date(item.created_at).toLocaleString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Guestbook Tab Content */}
        {activeTab === "guestbook" && (
          <div className="mt-6 space-y-4">
            {guestbook.length === 0 ? (
              <div className="rounded-xl border border-dashed border-eucalyptus/70 bg-cream-deep/40 py-12 text-center text-sm text-ink-muted">
                Chưa có lời chúc nào trong sổ lưu bút.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {guestbook.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-xl border border-eucalyptus/60 bg-cream-deep p-5 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display text-lg text-olive-deep font-medium">
                          {item.name}
                        </h3>
                        <span className="rounded-full bg-sage-mist px-2 py-0.5 text-[0.6875rem] text-olive-deep">
                          {item.side === "bride"
                            ? "Nhà gái"
                            : item.side === "groom"
                              ? "Nhà trai"
                              : "Cả hai"}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ink/90 whitespace-pre-line">
                        "{item.message}"
                      </p>
                    </div>
                    <div className="mt-4 border-t border-eucalyptus/30 pt-3 text-[0.6875rem] text-ink-muted flex justify-between items-center">
                      <span>{new Date(item.created_at).toLocaleDateString("vi-VN")}</span>
                      <Heart className="size-3 text-olive/60 fill-olive/20" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
