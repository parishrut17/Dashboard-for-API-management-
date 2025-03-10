import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudDownload as CloudDownloadIcon,
  Refresh as RefreshIcon,
  Api as ApiIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon,
  BugReport as BugReportIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for API details
const apiData = {
  id: 1,
  name: 'User API',
  version: 'v2.3.1',
  type: 'REST',
  status: 'Active',
  health: 'Healthy',
  owner: 'Authentication Team',
  description: 'Core API for user management and authentication services',
  baseUrl: 'https://api.example.com/users',
  lastUpdated: '2025-03-01',
  created: '2024-01-15',
  documentation: 'https://docs.example.com/api/users',
  repository: 'https://github.com/example/user-api',
  endpoints: [
    {
      path: '/users',
      method: 'GET',
      description: 'List all users',
      avgLatency: 120,
      errorRate: 0.5,
    },
    {
      path: '/users/{id}',
      method: 'GET',
      description: 'Get user by ID',
      avgLatency: 100,
      errorRate: 0.3,
    },
    {
      path: '/users',
      method: 'POST',
      description: 'Create new user',
      avgLatency: 150,
      errorRate: 0.8,
    },
  ],
  metrics: {
    uptime: '99.99%',
    totalRequests: '2.5M',
    avgLatency: '120ms',
    errorRate: '0.5%',
    p95Latency: '200ms',
    p99Latency: '350ms',
  },
  dependencies: [
    {
      name: 'Auth Service',
      status: 'Healthy',
      version: 'v1.5.0',
    },
    {
      name: 'Email Service',
      status: 'Degraded',
      version: 'v2.0.1',
    },
  ],
};

// Mock data for charts
const requestsData = [
  { time: '00:00', requests: 1500 },
  { time: '04:00', requests: 2000 },
  { time: '08:00', requests: 3500 },
  { time: '12:00', requests: 4200 },
  { time: '16:00', requests: 3800 },
  { time: '20:00', requests: 2800 },
  { time: '23:59', requests: 2000 },
];

const latencyData = [
  { time: '00:00', latency: 100 },
  { time: '04:00', latency: 120 },
  { time: '08:00', latency: 150 },
  { time: '12:00', latency: 180 },
  { time: '16:00', latency: 160 },
  { time: '20:00', latency: 130 },
  { time: '23:59', latency: 110 },
];

const errorData = [
  { category: '2xx', value: 92 },
  { category: '4xx', value: 5 },
  { category: '5xx', value: 3 },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

const ApiDetails = () => {
  const { apiId } = useParams();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'Active':
        return (
          <Chip
            label="Active"
            size="small"
            sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: 'success.main' }}
          />
        );
      case 'Deprecated':
        return (
          <Chip
            label="Deprecated"
            size="small"
            sx={{ bgcolor: 'rgba(245, 158, 11, 0.1)', color: 'warning.main' }}
          />
        );
      case 'Retired':
        return (
          <Chip
            label="Retired"
            size="small"
            sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', color: 'error.main' }}
          />
        );
      default:
        return null;
    }
  };

  const getHealthIcon = (health) => {
    switch (health) {
      case 'Healthy':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      case 'Degraded':
        return <WarningIcon sx={{ color: 'warning.main' }} />;
      case 'Unhealthy':
        return <ErrorIcon sx={{ color: 'error.main' }} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {apiData.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              {apiData.version}
            </Typography>
            {getStatusChip(apiData.status)}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {getHealthIcon(apiData.health)}
              <Typography variant="subtitle1">{apiData.health}</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ mr: 2 }}
          >
            Edit API
          </Button>
          <Button
            variant="outlined"
            startIcon={<CloudDownloadIcon />}
            sx={{ mr: 2 }}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Requests (24h)
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {apiData.metrics.totalRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Avg. Latency
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {apiData.metrics.avgLatency}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Error Rate
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {apiData.metrics.errorRate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Uptime
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {apiData.metrics.uptime}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<ApiIcon />} label="Overview" />
          <Tab icon={<TimelineIcon />} label="Metrics" />
          <Tab icon={<CodeIcon />} label="Endpoints" />
          <Tab icon={<StorageIcon />} label="Dependencies" />
          <Tab icon={<SecurityIcon />} label="Security" />
          <Tab icon={<SettingsIcon />} label="Settings" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ mb: 4 }}>
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    API Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ApiIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Base URL"
                        secondary={apiData.baseUrl}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CodeIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Documentation"
                        secondary={apiData.documentation}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <StorageIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Repository"
                        secondary={apiData.repository}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Metrics
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={requestsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="requests" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Latency Over Time
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={latencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="latency" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Response Status Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={errorData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {errorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tabValue === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                API Endpoints
              </Typography>
              <List>
                {apiData.endpoints.map((endpoint, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <Chip
                          label={endpoint.method}
                          size="small"
                          sx={{
                            bgcolor: endpoint.method === 'GET' ? 'info.main' : 'success.main',
                            color: 'white',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={endpoint.path}
                        secondary={endpoint.description}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          {endpoint.avgLatency}ms
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {endpoint.errorRate}% errors
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < apiData.endpoints.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        {tabValue === 3 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Dependencies
              </Typography>
              <List>
                {apiData.dependencies.map((dep, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {dep.status === 'Healthy' ? (
                          <CheckCircleIcon sx={{ color: 'success.main' }} />
                        ) : (
                          <WarningIcon sx={{ color: 'warning.main' }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={dep.name}
                        secondary={`Version: ${dep.version}`}
                      />
                      <Chip
                        label={dep.status}
                        size="small"
                        sx={{
                          bgcolor: dep.status === 'Healthy' ? 'success.main' : 'warning.main',
                          color: 'white',
                        }}
                      />
                    </ListItem>
                    {index < apiData.dependencies.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        {tabValue === 4 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Security Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Authentication"
                    secondary="OAuth 2.0 / JWT"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Rate Limiting"
                    secondary="1000 requests/minute"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="CORS"
                    secondary="Enabled for specific domains"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}

        {tabValue === 5 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                API Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Cache Configuration"
                    secondary="TTL: 5 minutes"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Timeout Settings"
                    secondary="30 seconds"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Retry Policy"
                    secondary="3 attempts with exponential backoff"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default ApiDetails;
