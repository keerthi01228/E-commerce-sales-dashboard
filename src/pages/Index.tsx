import { useState, useMemo } from "react";
import { KPICard } from "@/components/KPICard";
import { ChartCard } from "@/components/ChartCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  Download,
  Calendar,
} from "lucide-react";
import {
  revenueData,
  categoryData,
  topProducts,
  channelData,
  regionData,
  kpiData,
} from "@/lib/mockData";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const Index = () => {
  const [period, setPeriod] = useState("12months");

  const filteredRevenueData = useMemo(() => {
    const monthsToShow = period === "3months" ? 3 : period === "6months" ? 6 : 12;
    return revenueData.slice(-monthsToShow);
  }, [period]);

  const handleExport = () => {
    const headers = ["Month", "Revenue", "Orders"];
    const rows = filteredRevenueData.map((row) => [row.month, row.revenue, row.orders]);

    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `revenue-${period}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Sales Performance Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Real-time insights into your e-commerce performance
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 months</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="12months">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={`$${(kpiData.totalRevenue.value / 1000).toFixed(0)}K`}
            change={kpiData.totalRevenue.change}
            icon={<DollarSign className="w-12 h-12" />}
          />
          <KPICard
            title="Total Orders"
            value={kpiData.totalOrders.value.toLocaleString()}
            change={kpiData.totalOrders.change}
            icon={<ShoppingCart className="w-12 h-12" />}
          />
          <KPICard
            title="Average Order Value"
            value={`$${kpiData.averageOrderValue.value.toFixed(2)}`}
            change={kpiData.averageOrderValue.change}
            icon={<TrendingUp className="w-12 h-12" />}
          />
          <KPICard
            title="Conversion Rate"
            value={`${kpiData.conversionRate.value}%`}
            change={kpiData.conversionRate.change}
            trend="down"
            icon={<Users className="w-12 h-12" />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <ChartCard title="Revenue Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Sales by Category */}
          <ChartCard title="Sales by Category">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue by Channel */}
          <ChartCard title="Revenue by Marketing Channel">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ channel, value }) => `${channel}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Regional Performance */}
          <ChartCard title="Revenue by Region">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="region" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--chart-3))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Top Products Table */}
        <ChartCard title="Top Selling Products">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead className="text-right">Units Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Stock Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right">
                      {product.sales.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${product.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          product.stock < 200
                            ? "text-destructive font-semibold"
                            : "text-muted-foreground"
                        }
                      >
                        {product.stock}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ChartCard>
      </main>
    </div>
  );
};

export default Index;