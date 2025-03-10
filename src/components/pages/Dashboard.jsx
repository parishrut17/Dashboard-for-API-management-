import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Divider,
  Chip,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tooltip,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// Mock data for API metrics
const apiMetricsData = [
  { name: 'User API', requests: 2500000, latency: 120, errors: 0.5, cost: 1250 },
  { name: 'Payment API', requests: 1800000, latency: 200, errors: 0.8, cost: 980 },
  { name: 'Product API', requests: 3200000, latency: 150, errors: 0.3, cost: 1600 },
  { name: 'Order API', requests: 1500000, latency: 180, errors: 1.2, cost: 850 },
  { name: 'Auth API', requests: 4000000, latency: 90, errors: 0.2, cost: 2000 },
];

// Mock data for API requests over time
const requestsData = [
  { name: 'Jan', 'User API': 1500000, 'Payment API': 1200000, 'Product API': 2200000, 'Order API': 1000000, 'Auth API': 3000000 },
  { name: 'Feb', 'User API': 1800000, 'Payment API': 1300000, 'Product API': 2500000, 'Order API': 1100000, 'Auth API': 3200000 },
  { name: 'Mar', 'User API': 2000000, 'Payment API': 1500000, 'Product API': 2800000, 'Order API': 1300000, 'Auth API': 3500000 },
  { name: 'Apr', 'User API': 2200000, 'Payment API': 1600000, 'Product API': 3000000, 'Order API': 1400000, 'Auth API': 3700000 },
  { name: 'May', 'User API': 2400000, 'Payment API': 1700000, 'Product API': 3100000, 'Order API': 1450000, 'Auth API': 3800000 },
  { name: 'Jun', 'User API': 2500000, 'Payment API': 1800000, 'Product API': 3200000, 'Order API': 1500000, 'Auth API': 4000000 },
];

// Mock data for cloud consumption
const cloudConsumptionData = [
  { name: 'API Gateway', value: 35 },
  { name: 'Lambda', value: 25 },
  { name: 'DynamoDB', value: 20 },
  { name: 'CloudFront', value: 10 },
  { name: 'S3', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Mock data for API health
const apiHealthData = [
  { name: 'User API', status: 'Healthy', uptime: '99.99%', icon: <CheckCircleIcon sx={{ color: 'success.main' }} /> },
  { name: 'Payment API', status: 'Degraded', uptime: '99.5%', icon: <WarningIcon sx={{ color: 'warning.main' }} /> },
  { name: 'Product API', status: 'Healthy', uptime: '99.98%', icon: <CheckCircleIcon sx={{ color: 'success.main' }} /> },
  { name: 'Order API', status: 'Healthy', uptime: '99.95%', icon: <CheckCircleIcon sx={{ color: 'success.main' }} /> },
  { name: 'Auth API', status: 'Healthy', uptime: '99.99%', icon: <CheckCircleIcon sx={{ color: 'success.main' }} /> },
];

// Mock data for recent alerts
const recentAlertsData = [
  {
    id: 1,
    severity: 'error',
    message: 'Payment API latency exceeded threshold (500ms)',
    time: '10 minutes ago',
    icon: <ErrorIcon sx={{ color: 'error.main' }} />,
  },
  {
    id: 2,
    severity: 'warning',
    message: 'Auth API 5xx error rate increased by 0.2%',
    time: '1 hour ago',
    icon: <WarningIcon sx={{ color: 'warning.main' }} />,
  },
  {
    id: 3,
    severity: 'info',
    message: 'Product API new version deployed successfully',
    time: '3 hours ago',
    icon: <InfoIcon sx={{ color: 'info.main' }} />,
  },
  {
    id: 4,
    severity: 'error',
    message: 'Lambda function timeout in Order API',
    time: '5 hours ago',
    icon: <ErrorIcon sx={{ color: 'error.main' }} />,
  },
];

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          API Management Dashboard
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            sx={{ mr: 2 }}
          >
            Refresh Data
          </Button>
          <Button variant="outlined">Export Report</Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total APIs
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                24
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  icon={<TrendingUpIcon />}
                  label="+2 this month"
                  size="small"
                  sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: 'success.main' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Requests (24h)
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                13.2M
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  icon={<TrendingUpIcon />}
                  label="+8.1% vs yesterday"
                  size="small"
                  sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: 'success.main' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Avg. Latency
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                148ms
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  icon={<TrendingDownIcon />}
                  label="-12ms vs yesterday"
                  size="small"
                  sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: 'success.main' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Error Rate (24h)
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                0.6%
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  icon={<TrendingUpIcon />}
                  label="+0.1% vs yesterday"
                  size="small"
                  sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', color: 'error.main' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* API Requests Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="API Requests Over Time"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={requestsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="User API" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Payment API" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="Product API" stroke="#ffc658" />
                  <Line type="monotone" dataKey="Order API" stroke="#ff8042" />
                  <Line type="monotone" dataKey="Auth API" stroke="#0088FE" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Cloud Consumption */}
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title="AWS Cloud Consumption"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cloudConsumptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {cloudConsumptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* API Metrics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="API Performance Metrics"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={apiMetricsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="latency" name="Avg. Latency (ms)" fill="#8884d8" />
                  <Bar dataKey="errors" name="Error Rate (%)" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* API Health Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="API Health Status"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List sx={{ width: '100%' }}>
                {apiHealthData.map((api, index) => (
                  <React.Fragment key={api.name}>
                    <ListItem
                      secondaryAction={
                        <Chip
                          label={api.uptime}
                          size="small"
                          color={api.status === 'Healthy' ? 'success' : 'warning'}
                          variant="outlined"
                        />
                      }
                    >
                      <ListItemAvatar>{api.icon}</ListItemAvatar>
                      <ListItemText
                        primary={api.name}
                        secondary={api.status}
                        primaryTypographyProps={{ fontWeight: 500 }}
                        secondaryTypographyProps={{
                          color: api.status === 'Healthy' ? 'success.main' : 'warning.main',
                        }}
                      />
                    </ListItem>
                    {index < apiHealthData.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Alerts */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Recent Alerts"
              action={
                <Button size="small" color="primary">
                  View All
                </Button>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List sx={{ width: '100%' }}>
                {recentAlertsData.map((alert, index) => (
                  <React.Fragment key={alert.id}>
                    <ListItem
                      secondaryAction={
                        <Typography variant="caption" color="text.secondary">
                          {alert.time}
                        </Typography>
                      }
                    >
                      <ListItemAvatar>{alert.icon}</ListItemAvatar>
                      <ListItemText
                        primary={alert.message}
                        primaryTypographyProps={{
                          variant: 'body2',
                          fontWeight: 500,
                        }}
                      />
                    </ListItem>
                    {index < recentAlertsData.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
