import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  CloudDownload as CloudDownloadIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// Mock data for cloud consumption
const monthlyConsumption = [
  { month: 'Jan', apiGateway: 450, lambda: 380, dynamodb: 320, cloudfront: 220, s3: 150 },
  { month: 'Feb', apiGateway: 480, lambda: 400, dynamodb: 340, cloudfront: 240, s3: 160 },
  { month: 'Mar', apiGateway: 520, lambda: 420, dynamodb: 360, cloudfront: 260, s3: 180 },
  { month: 'Apr', apiGateway: 550, lambda: 450, dynamodb: 380, cloudfront: 280, s3: 200 },
  { month: 'May', apiGateway: 600, lambda: 480, dynamodb: 400, cloudfront: 300, s3: 220 },
  { month: 'Jun', apiGateway: 650, lambda: 520, dynamodb: 420, cloudfront: 320, s3: 240 },
];

const serviceDistribution = [
  { name: 'API Gateway', value: 650, color: '#0088FE' },
  { name: 'Lambda', value: 520, color: '#00C49F' },
  { name: 'DynamoDB', value: 420, color: '#FFBB28' },
  { name: 'CloudFront', value: 320, color: '#FF8042' },
  { name: 'S3', value: 240, color: '#8884d8' },
];

const regionData = [
  { region: 'us-east-1', cost: 1200 },
  { region: 'us-west-2', cost: 800 },
  { region: 'eu-west-1', cost: 600 },
  { region: 'ap-southeast-1', cost: 400 },
  { region: 'ap-northeast-1', cost: 300 },
];

const CloudConsumption = () => {
  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 }, maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 2, sm: 0 },
        mb: 4
      }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 3, fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' } }}>
          Cloud Consumption
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
          <Button
            variant="outlined"
            startIcon={<CloudDownloadIcon />}
            sx={{ mr: { xs: 0, sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
          >
            Export Report
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Refresh Data
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Monthly Cost
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                $3,300
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  icon={<TrendingUpIcon />}
                  label="+8% vs last month"
                  size="small"
                  sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', color: 'error.main' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                API Gateway Cost
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                $650
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  icon={<TrendingUpIcon />}
                  label="+5% vs last month"
                  size="small"
                  sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', color: 'error.main' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Lambda Cost
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                $520
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  icon={<TrendingDownIcon />}
                  label="-3% vs last month"
                  size="small"
                  sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: 'success.main' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Storage Cost
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                $240
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  icon={<TrendingUpIcon />}
                  label="+2% vs last month"
                  size="small"
                  sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', color: 'error.main' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Monthly Consumption Trend */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardHeader
              title="Monthly Consumption Trend"
              titleTypographyProps={{
                sx: {
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  fontWeight: 600,
                  color: 'text.primary',
                },
              }}
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ width: '100%', height: { xs: 300, sm: 400, md: 450 } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyConsumption}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={{ stroke: '#cbd5e1' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '20px',
                    }}
                  />
                  <Line type="monotone" dataKey="apiGateway" name="API Gateway" stroke="#0088FE" />
                  <Line type="monotone" dataKey="lambda" name="Lambda" stroke="#00C49F" />
                  <Line type="monotone" dataKey="dynamodb" name="DynamoDB" stroke="#FFBB28" />
                  <Line type="monotone" dataKey="cloudfront" name="CloudFront" stroke="#FF8042" />
                  <Line type="monotone" dataKey="s3" name="S3" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Service Distribution */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader
              title="Service Distribution"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ width: '100%', height: { xs: 300, sm: 400, md: 450 } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => ({
                      fill: '#64748b',
                      fontSize: 12,
                      value: `${name} ${(percent * 100).toFixed(0)}%`
                    })}
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '20px',
                    }}
                  />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Regional Distribution */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Cost by Region"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ width: '100%', height: { xs: 250, sm: 300, md: 350 } }}>
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="region"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={{ stroke: '#cbd5e1' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '20px',
                    }}
                  />
                  <Bar dataKey="cost" name="Cost ($)" fill="#0088FE" />
                </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CloudConsumption;
