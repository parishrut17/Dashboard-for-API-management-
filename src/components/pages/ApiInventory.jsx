import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Link as LinkIcon,
  Add as AddIcon,
  CloudDownload as CloudDownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Mock data for API inventory
const apiInventoryData = [
  {
    id: 1,
    name: 'User API',
    version: 'v2.3.1',
    type: 'REST',
    status: 'Active',
    health: 'Healthy',
    owner: 'Authentication Team',
    lastUpdated: '2025-03-01',
    endpoints: 12,
    avgLatency: 120,
    errorRate: 0.5,
    cloudProvider: 'AWS',
    region: 'us-east-1',
  },
  {
    id: 2,
    name: 'Payment API',
    version: 'v1.8.0',
    type: 'REST',
    status: 'Active',
    health: 'Degraded',
    owner: 'Billing Team',
    lastUpdated: '2025-02-15',
    endpoints: 8,
    avgLatency: 200,
    errorRate: 0.8,
    cloudProvider: 'AWS',
    region: 'us-west-2',
  },
  {
    id: 3,
    name: 'Product API',
    version: 'v3.0.2',
    type: 'GraphQL',
    status: 'Active',
    health: 'Healthy',
    owner: 'Product Team',
    lastUpdated: '2025-03-05',
    endpoints: 5,
    avgLatency: 150,
    errorRate: 0.3,
    cloudProvider: 'AWS',
    region: 'eu-west-1',
  },
  {
    id: 4,
    name: 'Order API',
    version: 'v2.1.0',
    type: 'REST',
    status: 'Active',
    health: 'Healthy',
    owner: 'Order Management Team',
    lastUpdated: '2025-02-28',
    endpoints: 10,
    avgLatency: 180,
    errorRate: 1.2,
    cloudProvider: 'AWS',
    region: 'us-east-1',
  },
  {
    id: 5,
    name: 'Auth API',
    version: 'v1.5.3',
    type: 'REST',
    status: 'Active',
    health: 'Healthy',
    owner: 'Authentication Team',
    lastUpdated: '2025-02-10',
    endpoints: 6,
    avgLatency: 90,
    errorRate: 0.2,
    cloudProvider: 'AWS',
    region: 'us-east-1',
  },
  {
    id: 6,
    name: 'Notification API',
    version: 'v1.2.0',
    type: 'REST',
    status: 'Active',
    health: 'Healthy',
    owner: 'Communications Team',
    lastUpdated: '2025-01-20',
    endpoints: 4,
    avgLatency: 110,
    errorRate: 0.4,
    cloudProvider: 'AWS',
    region: 'us-west-2',
  },
  {
    id: 7,
    name: 'Analytics API',
    version: 'v2.0.1',
    type: 'GraphQL',
    status: 'Deprecated',
    health: 'Healthy',
    owner: 'Data Team',
    lastUpdated: '2024-11-15',
    endpoints: 8,
    avgLatency: 250,
    errorRate: 0.6,
    cloudProvider: 'AWS',
    region: 'eu-central-1',
  },
  {
    id: 8,
    name: 'Search API',
    version: 'v3.1.0',
    type: 'REST',
    status: 'Active',
    health: 'Degraded',
    owner: 'Search Team',
    lastUpdated: '2025-02-25',
    endpoints: 3,
    avgLatency: 300,
    errorRate: 1.5,
    cloudProvider: 'AWS',
    region: 'us-east-1',
  },
];

const ApiInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [healthFilter, setHealthFilter] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedApi, setSelectedApi] = useState(null);

  const handleMenuOpen = (event, api) => {
    setAnchorEl(event.currentTarget);
    setSelectedApi(api);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedApi(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleHealthFilterChange = (event) => {
    setHealthFilter(event.target.value);
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

  const filteredApis = apiInventoryData.filter((api) => {
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.version.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? api.status === statusFilter : true;
    const matchesType = typeFilter ? api.type === typeFilter : true;
    const matchesHealth = healthFilter ? api.health === healthFilter : true;
    
    return matchesSearch && matchesStatus && matchesType && matchesHealth;
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          API Inventory
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mr: 2 }}
          >
            Register New API
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

      {/* Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search by API name, owner, or version"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="status-filter-label">Status</InputLabel>
                  <Select
                    labelId="status-filter-label"
                    value={statusFilter}
                    label="Status"
                    onChange={handleStatusFilterChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Deprecated">Deprecated</MenuItem>
                    <MenuItem value="Retired">Retired</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="type-filter-label">Type</InputLabel>
                  <Select
                    labelId="type-filter-label"
                    value={typeFilter}
                    label="Type"
                    onChange={handleTypeFilterChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="REST">REST</MenuItem>
                    <MenuItem value="GraphQL">GraphQL</MenuItem>
                    <MenuItem value="SOAP">SOAP</MenuItem>
                    <MenuItem value="gRPC">gRPC</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="health-filter-label">Health</InputLabel>
                  <Select
                    labelId="health-filter-label"
                    value={healthFilter}
                    label="Health"
                    onChange={handleHealthFilterChange}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Healthy">Healthy</MenuItem>
                    <MenuItem value="Degraded">Degraded</MenuItem>
                    <MenuItem value="Unhealthy">Unhealthy</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                >
                  More Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* API Table */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell>API Name</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Health</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Avg. Latency</TableCell>
              <TableCell>Error Rate</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApis.map((api) => (
              <TableRow key={api.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight={500}>
                      {api.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{api.version}</TableCell>
                <TableCell>{api.type}</TableCell>
                <TableCell>{getStatusChip(api.status)}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getHealthIcon(api.health)}
                    <Typography variant="body2">{api.health}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{api.owner}</TableCell>
                <TableCell>{api.lastUpdated}</TableCell>
                <TableCell>{api.avgLatency}ms</TableCell>
                <TableCell>{api.errorRate}%</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Tooltip title="View API Details">
                      <IconButton
                        component={Link}
                        to={`/api-inventory/${api.id}`}
                        size="small"
                      >
                        <LinkIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="More Options">
                      <IconButton
                        size="small"
                        onClick={(event) => handleMenuOpen(event, api)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit API</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Documentation</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Metrics</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          Deprecate API
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ApiInventory;
