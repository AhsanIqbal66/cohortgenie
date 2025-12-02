import { SlideItem, Stat } from "@/types";
import slide1 from "../public/images/slide1.png";
import { AlertTriangle, DollarSign, BarChart3 } from "lucide-react";
import {
  ChartFillIcon,
  ChurnFillIcon,
  DollerCircleFillIcon,
  DollerCircleIcon,
  GDRfILLIcon,
  GDRIcon,
  InfoIcon,
  NDRfILLIcon,
  NDRIcon,
  RankingIcon,
  StarIcon,
  TwoProfileFillIcon,
  TwoProfileIcon,
} from "@/icons";
export const loginSlides: SlideItem[] = [
  {
    img: slide1,
    title: "Clarity, Not Chaos",
    desc: "From messy reports to understandable insights finally see your financial story in a way that feels clear, calm, and in control.",
  },
  {
    img: slide1,
    title: "Your Heading 2",
    desc: "This is the description text for slide two.",
  },
  {
    img: slide1,
    title: "Your Heading 3",
    desc: "This is the description text for slide three.",
  },
];
export const years = ["All", "2025", "2024", "2023"];
export const yearsOnly = ["2025", "2024", "2023"];
export const yearsWIthoutAll = ["2025", "2024", "2023"];
export const months = [
  { id: "1", value: "january", label: "January" },
  { id: "2", value: "february", label: "February" },
  { id: "3", value: "march", label: "March" },
  { id: "4", value: "april", label: "April" },
  { id: "5", value: "may", label: "May" },
  { id: "6", value: "june", label: "June" },
  { id: "7", value: "july", label: "July" },
  { id: "8", value: "august", label: "August" },
  { id: "9", value: "september", label: "September" },
  { id: "10", value: "october", label: "October" },
  { id: "11", value: "november", label: "November" },
  { id: "12", value: "december", label: "December" },
];
export const quarters = [
  { id: "1", value: "q1", label: "Quarter 1" },
  { id: "2", value: "q2", label: "Quarter 2" },
  { id: "3", value: "q3", label: "Quarter 3" },
  { id: "4", value: "q4", label: "Quarter 4" },
];
export const statsData: Stat[] = [
  {
    id: 1,
    title: "Gross Dollar Retention",
    value: "92%",
    label: "GDR",
    growth: "3.4%",
    icon: GDRIcon,
    fillIcon: GDRfILLIcon,
  },
  {
    id: 2,
    title: "Net Dollar Retention",
    value: "108%",
    label: "NDR",
    growth: "5.1%",
    icon: NDRIcon,
    fillIcon: NDRfILLIcon,
  },
  {
    id: 3,
    title: "Lifetime Value",
    value: "$2,340",
    label: "LTV",
    growth: "12%",
    icon: DollerCircleIcon,
    fillIcon: DollerCircleFillIcon,
  },
  {
    id: 4,
    title: "Active Customers",
    value: "392",
    label: "Churn Rate: 8.0%",
    growth: "1.8%",
    icon: TwoProfileIcon,
    fillIcon: TwoProfileFillIcon,
  },
];
export const CustomerRetentionChartData = [
  { month: "Jan", retention: 98 },
  { month: "Feb", retention: 75 },
  { month: "Mar", retention: 73 },
  { month: "Apr", retention: 78 },
  { month: "May", retention: 90 },
  { month: "Jun", retention: 70 },
  { month: "Jul", retention: 78 },
  { month: "Aug", retention: 60 },
  { month: "Sep", retention: 80 },
  { month: "Oct", retention: 50 },
  { month: "Nov", retention: 55 },
  { month: "Dec", retention: 82 },
];
export const insights = [
  {
    icon: ChartFillIcon,
  },
  {
    icon: DollerCircleFillIcon,
  },

  {
    icon: ChurnFillIcon,
  },
];

export const monthLabels = [
  "Jan 2025",
  "Feb 2025",
  "Mar 2025",
  "Apr 2025",
  "May 2025",
  "Jun 2025",
  "Jul 2025",
  "Aug 2025",
  "Sep 2025",
  "Oct 2025",
  "Nov 2025",
  "Dec 2025",
];
export const monthsdata = [
  [100, 96, 264, 419, 1816, 38, 36, 100, 158, 687, 38, 36],
  [0, 100, 264, 419, 1816, 38, 36, 100, 158, 687, 38, 36],
  [0, 0, 100, 1816, 38, 36, 100, 100, 158, 687, 38, 38],
  [0, 0, 0, 100, 38, 36, 100, 158, 687, 38, 36, 60],
  [0, 0, 0, 0, 100, 36, 100, 158, 687, 38, 36, 60],
  [0, 0, 0, 0, 0, 100, 96, 264, 419, 1816, 687, 38],
  [0, 0, 0, 0, 0, 104, 100, 275, 434, 1885, 38, 36],
  [0, 0, 0, 0, 0, 38, 36, 100, 158, 687, 419, 1816],
  [0, 0, 0, 0, 0, 24, 23, 63, 100, 434, 96, 264],
  [0, 0, 0, 0, 0, 6, 5, 15, 23, 100, 419, 1816],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 419],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
];
export const yearMatrix = [
  [100, 3413, 50],
  [3, 100, 70],
  [3, 0, 100],
];
export const quarterMatrix = [
  [100, 0, 0, 0],
  [0, 100, 754, 1816],
  [0, 13, 100, 241],
  [0, 6, 42, 100],
];
export const Chart1 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="133"
      height="64"
      viewBox="0 0 133 64"
      fill="none"
    >
      <path
        opacity="0.3"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M131.295 3.59659C131.295 3.59659 122.303 24.6341 112.782 24.6341C103.79 24.6341 103.79 15.7091 94.2693 15.7091C85.2773 15.7091 85.2773 30.3717 75.7565 30.3717C66.7645 30.3717 66.7645 1.68408 57.2436 1.68408C48.2517 1.68408 48.2517 45.6717 38.7308 45.6717C29.7389 45.6717 29.7389 27.8217 20.218 27.8217C11.2261 27.8217 1.70518 43.1217 1.70518 43.1217V63.9999H131.295V3.59659Z"
        fill="url(#paint0_linear_745_2096)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M57.2434 0.841797C52.9469 0.841797 51.0612 5.968 47.7073 21.7222L47.0331 24.8961C43.9452 39.239 41.8981 44.6313 38.7306 44.6313C35.6279 44.6313 33.8759 42.7327 30.9026 37.1058L30.4306 36.2033C26.8591 29.3469 24.6521 26.8616 20.2178 26.8616C19.7018 26.8616 19.1796 26.9069 18.6518 26.9957C14.8578 27.6346 10.9125 30.4563 6.9585 34.7529C5.40102 36.4453 3.94896 38.2554 2.63945 40.0654C2.29564 40.5406 1.98007 40.9906 1.69482 41.4091L0.979523 42.4925L2.43039 43.3773L2.84348 42.7438C3.18513 42.2318 3.58122 41.6604 4.02675 41.0446C5.29994 39.2848 6.71157 37.5251 8.22027 35.8857C11.9396 31.8442 15.6147 29.2157 18.9383 28.656C19.3732 28.5828 19.7997 28.5458 20.2178 28.5458C23.5383 28.5458 25.4153 30.4458 28.3656 35.9357L29.6741 38.4167C32.7898 44.2165 34.8419 46.3155 38.7306 46.3155C43.3398 46.3155 45.3766 40.8602 48.8558 24.5245L49.6791 20.6608C52.5455 7.46958 54.4405 2.52601 57.2434 2.52601C60.5577 2.52601 62.5273 5.96547 65.6831 15.5966L66.4832 18.05C69.6877 27.7391 71.6688 31.0844 75.7562 31.0844C79.8689 31.0844 82.0831 29.2667 85.298 24.3763L86.7423 22.1312C89.5127 17.913 91.2327 16.4879 94.2691 16.4879C97.82 16.4879 99.6901 17.4575 102.727 20.3094L103.328 20.8824C106.765 24.1811 108.849 25.3727 112.782 25.3727C117.339 25.3727 121.877 21.2894 126.324 14.5174C127.847 12.1977 129.251 9.71668 130.504 7.23606L131.006 6.22529C131.085 6.06219 131.163 5.90189 131.238 5.74454L131.921 4.27704L132.08 3.91658L130.51 3.25901L130.114 4.13818L129.697 5.0247C129.476 5.48624 129.236 5.9742 128.978 6.48415C127.752 8.912 126.378 11.3394 124.893 13.6009C120.745 19.9182 116.555 23.6885 112.782 23.6885C109.541 23.6885 107.811 22.7768 104.903 20.0418L104.318 19.4843C100.75 16.0591 98.5198 14.8037 94.2691 14.8037C90.3351 14.8037 88.2609 16.636 85.0055 21.6855L84.4885 22.497C81.2125 27.6628 79.3343 29.4002 75.7562 29.4002C72.8266 29.4002 71.0071 26.2862 68.1023 17.5206L67.1041 14.4661C63.7705 4.39362 61.6388 0.841797 57.2434 0.841797Z"
        fill="#9B6EEE"
      />
      <defs>
        <linearGradient
          id="paint0_linear_745_2096"
          x1="130"
          y1="1.78277"
          x2="130"
          y2="62.8535"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9B6EEE" />
          <stop offset="1" stop-color="#9B6EEE" stop-opacity="0.03" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export const Chart2 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="135"
      height="64"
      viewBox="0 0 135 64"
      fill="none"
    >
      <path
        opacity="0.3"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.5097 1.72949C29.6313 1.72949 29.6313 43.5362 39.2896 43.5362C48.4113 43.5362 48.4113 28.0859 58.0695 28.0859C67.1912 28.0859 67.1912 22.6328 76.8494 22.6328C85.9711 22.6328 85.9711 23.5417 95.6294 23.5417C104.751 23.5417 104.751 31.7212 114.409 31.7212C123.531 31.7212 133.189 55.3511 133.189 55.3511V63.9998H1.72974V20.8152C1.72974 20.8152 10.8514 1.72949 20.5097 1.72949Z"
        fill="url(#paint0_linear_745_2113)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.5095 0.864746C24.7053 0.864746 26.6474 5.47582 29.8433 19.3577L30.8752 23.9133C34.0022 37.5752 36.0629 42.6714 39.2894 42.6714C42.4747 42.6714 44.2349 41.0474 47.2338 36.1896L47.7391 35.362C51.2532 29.5798 53.4815 27.3566 57.6707 27.2272L58.0693 27.2211C61.4052 27.2211 63.1977 26.6653 66.0986 25.0286L66.8237 24.6116C70.4178 22.5244 72.6379 21.7681 76.8492 21.7681L78.353 21.7753C80.4732 21.7974 82.0471 21.8722 83.9185 22.026L87.4341 22.3487C89.7338 22.5523 91.5241 22.6463 94.1233 22.6705L95.6292 22.6769C99.4287 22.6769 101.524 23.6815 104.757 26.4351L105.386 26.9794C108.717 29.8811 110.626 30.8565 114.409 30.8565C114.957 30.8565 115.511 30.9298 116.068 31.0733C119.974 32.0792 123.956 36.4346 127.961 43.0904C129.532 45.702 130.998 48.4959 132.319 51.2892L132.849 52.4273C133.018 52.7946 133.178 53.1492 133.329 53.4898L133.741 54.4339L133.99 55.024L132.388 55.6785L131.963 54.6818L131.518 53.6792C131.283 53.1572 131.028 52.6055 130.756 52.0289C129.457 49.284 128.018 46.5396 126.479 43.9822C122.7 37.7021 118.951 33.602 115.637 32.7484C115.217 32.6404 114.808 32.5862 114.409 32.5862C110.3 32.5862 108.058 31.5279 104.695 28.6671L104.049 28.1085C100.997 25.4503 99.2477 24.4939 96.0901 24.4124L94.0992 24.4C91.4565 24.3753 89.6262 24.2791 87.2882 24.0723L84.3121 23.7953C81.8096 23.5767 79.9621 23.4978 76.8492 23.4978C73.1928 23.4978 71.2555 24.0922 68.2106 25.8105L67.4913 26.2242C64.2136 28.1277 62.1791 28.8718 58.6685 28.9448L58.0693 28.9509C54.6745 28.9509 52.7857 30.5691 49.8245 35.2771L49.0161 36.5913C45.5242 42.337 43.4175 44.4012 39.2894 44.4012C34.7084 44.4012 32.6191 39.3243 29.1956 24.3295L28.1697 19.8031C25.2707 7.25779 23.3642 2.59448 20.5095 2.59448C16.6485 2.59448 12.4041 6.02567 8.19588 11.7828C6.69215 13.84 5.30146 16.0484 4.05958 18.257C3.73357 18.8368 3.43562 19.3853 3.16756 19.8947L2.70314 20.7963L2.50987 21.1882L0.949219 20.4423L1.37117 19.5998L1.92195 18.5536C2.1189 18.1877 2.32904 17.8055 2.55185 17.4093C3.82514 15.1447 5.25144 12.8798 6.79944 10.7621C11.3105 4.59067 15.9195 0.864746 20.5095 0.864746Z"
        fill="#EC6666"
      />
      <defs>
        <linearGradient
          id="paint0_linear_745_2113"
          x1="1.72974"
          y1="1.72949"
          x2="1.72974"
          y2="63.9998"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EC6666" />
          <stop offset="1" stop-color="#EC6666" stop-opacity="0.103475" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export const MontCHartdata = [
  { month: "M1", Jan: 100, Mar: 80, Feb: 60 },
  { month: "M2", Jan: 85, Mar: 80, Feb: 83 },
  { month: "M3", Jan: 80, Mar: 75, Feb: 78 },
  { month: "M4", Jan: 100, Mar: 80, Feb: 60 },
  { month: "M5", Jan: 82.9, Mar: 77.9, Feb: 76.9 },
  { month: "M6", Jan: 20, Mar: 40, Feb: 60 },
  { month: "M7", Jan: 78, Mar: 72, Feb: 73 },
  { month: "M8", Jan: 100, Mar: 80, Feb: 60 },
  { month: "M9", Jan: 73, Mar: 67, Feb: 69 },
  { month: "M10", Jan: 70, Mar: 63, Feb: 65 },
  { month: "M11", Jan: 20, Mar: 40, Feb: 60 },
  { month: "M12", Jan: 65, Mar: 58, Feb: 60 },
];
export const comparisonMontChartdata = [
  { month: "M1", April_2024: 94, November_2024: 90 },
  { month: "M2", April_2024: 76, November_2024: 78 },
  { month: "M3", April_2024: 82, November_2024: 80 },
  { month: "M4", April_2024: 88, November_2024: 85 },
  { month: "M5", April_2024: 90, November_2024: 92 },
  { month: "M6", April_2024: 94, November_2024: 89 },
];
export const chartData2lines = [{ month: "M1", april: 90, oct: 78 }];
export const MetricsComparisonTableData = [
  {
    metric: "Gross Dollar Retention",
    current: "94.2%",
    previous: "92.1%",
    change: 2.1,
    isCurrency: false,
  },
  {
    metric: "Net Dollar Retention",
    current: "112.8%",
    previous: "107.5%",
    change: 5.3,
    isCurrency: false,
  },
  {
    metric: "Customer LTV",
    current: "$12,450",
    previous: "$11,520",
    change: 8.1,
    isCurrency: true,
  },
  {
    metric: "Churn Rate",
    current: "5.8%",
    previous: "7.9%",
    change: -2.1, // Negative value to indicate red/downward
    isCurrency: false,
  },
  {
    metric: "M1 Retention",
    current: "88.5%",
    previous: "85.3%",
    change: 3.2,
    isCurrency: false,
  },
  {
    metric: "M3 Retention",
    current: "75.4%",
    previous: "71.8%",
    change: 3.6,
    isCurrency: false,
  },
];
export const retentionData = {
  highest: {
    value: "78%",
    label: "Highest: Jun 2025",
    fullMetric: "78% retention",
    color: "text-violet-500",
    icon: RankingIcon,
    chartData: "M1 20 C20 0, 40 25, 60 5 L79 15",
  },
  lowest: {
    value: "71%",
    label: "Lowest: Apr 2025",
    fullMetric: "71% retention",
    color: "text-red-500",
    icon: InfoIcon,
    chartData: "M1 10 C20 20, 40 10, 60 20 L79 5",
  },
  average: {
    value: 82,
    label: "Overall average: 81%",
    fullMetric: "Across 12 cohorts",
    color: "#14FAF7",
    icon: StarIcon,
  },
};
export const typeToggleItems = [
  { value: "month", label: "Monthly" },
  { value: "quarter", label: "Quarterly" },
  { value: "year", label: "Yearly" },
];

export const quarterLabels = ["Q1", "Q2", "Q3", "Q4"];
export const eer = {
  data: {
    success: true,
    cohortGenie: {
      title: "CGP Financial Performance Dashboard",
      description: "Cohort-based Financial Summary and Trend Analysis",
      viewType: "month",
      summary: {
        cohort: "Dec 25",
        customers: 124,
        metrics: {
          baselineRevenue: "$1,250.00",
          totalRevenue: 18250.55,
          totalRefunds: 325.25,
          netRevenue: 17925.3,
          expansion: 820.55,
          contraction: 210.4,
          churn: 65.1,
          GDR: "12.50%",
          NDR: "118.50%",
          LTV: "$145.20",
        },
        period: {
          startDate: "2025-11-30T19:00:00.000Z",
          endDate: "2025-12-31T18:59:59.000Z",
        },
      },
      trend: {
        weekly: [
          {
            period: "Week 1",
            netRevenue: 420.55,
          },
          {
            period: "Week 2",
            netRevenue: 685.1,
          },
          {
            period: "Week 3",
            netRevenue: 1125.8,
          },
          {
            period: "Week 4",
            netRevenue: 780.45,
          },
        ],
        monthly: [
          { period: "Jan", netRevenue: 240 },
          { period: "Feb", netRevenue: 310 },
          { period: "Mar", netRevenue: 380 },
          { period: "Apr", netRevenue: 450 },
          { period: "May", netRevenue: 525 },
          { period: "Jun", netRevenue: 401.75 },
          { period: "Jul", netRevenue: 387 },
          { period: "Aug", netRevenue: 1062.4 },
          { period: "Sep", netRevenue: 1681.4 },
          { period: "Oct", netRevenue: 7295.34 },
          { period: "Nov", netRevenue: 1525.6 },
          { period: "Dec", netRevenue: 2100.8 },
        ],
        quarterly: [
          { period: "Q1", netRevenue: 930 },
          { period: "Q2", netRevenue: 1380.75 },
          { period: "Q3", netRevenue: 3130.8 },
          { period: "Q4", netRevenue: 10921.74 },
        ],
        yearly: [
          { period: "2023", netRevenue: 362.07 },
          { period: "2024", netRevenue: 387 },
          { period: "2025", netRevenue: 12875.25 },
        ],
      },
      heatmap: {
        month: {
          year: 2025,
          monthTotals: [
            240, 310, 380, 450, 525, 401.75, 387, 1062.4, 1681.4, 7295.34,
            1525.6, 2100.8,
          ],
          monthMatrix: [
            [100, 75, 63, 53, 46, 19, 17, 33, 45, 150, 63, 88],
            [80, 100, 68, 58, 50, 20, 18, 35, 48, 155, 65, 90],
            [65, 70, 100, 75, 63, 24, 22, 40, 55, 160, 72, 95],
            [58, 60, 72, 100, 80, 29, 27, 48, 65, 170, 80, 110],
            [52, 54, 65, 78, 100, 38, 34, 55, 75, 185, 90, 120],
            [20, 21, 24, 27, 32, 100, 96, 264, 419, 1816, 65, 92],
            [18, 19, 22, 25, 29, 104, 100, 275, 434, 1885, 60, 85],
            [10, 11, 14, 16, 19, 38, 36, 100, 158, 687, 55, 78],
            [8, 9, 12, 14, 17, 24, 23, 63, 100, 434, 50, 72],
            [3, 4, 5, 6, 7, 6, 5, 15, 23, 100, 40, 60],
            [12, 14, 15, 18, 20, 10, 9, 20, 30, 45, 100, 70],
            [15, 18, 20, 22, 25, 12, 10, 25, 35, 55, 85, 100],
          ],
          monthLabels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          weekTotals: [420.55, 685.1, 1125.8, 780.45],
          weekMatrix: [
            [100, 58, 37, 54],
            [62, 100, 61, 48],
            [35, 60, 100, 69],
            [50, 55, 70, 100],
          ],
          weekLabels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        },
        quarter: {
          year: 2025,
          quarterTotals: [930, 1380.75, 3130.8, 10921.74],
          quarterMatrix: [
            [100, 148, 336, 1175],
            [67, 100, 227, 790],
            [29, 44, 100, 349],
            [8, 12, 29, 100],
          ],
          quarterLabels: ["Q1", "Q2", "Q3", "Q4"],
        },
        year: {
          years: [2023, 2024, 2025],
          yearTotals: [362.07, 387, 12875.25],
          yearMatrix: [
            [100, 107, 3556],
            [94, 100, 3327],
            [3, 4, 100],
          ],
        },
      },
      insights: [
        {
          title: "Revenue +333.9% MoM",
          desc: "Revenue moved from $1681.40 (Sep) to $7295.34 (Oct)",
        },
        {
          title: "Top Revenue Month",
          desc: "Oct generated the highest revenue at $7295.34",
        },
        {
          title: "Churn",
          desc: "Churn increased by 5.2% from Nov to Dec",
        },
      ],
    },
  },
};
