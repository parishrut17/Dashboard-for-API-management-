import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      slackNotifications: true,
      errorThreshold: 1.0,
      latencyThreshold: 500,
    },
    security: {
      requireMFA: true,
      sessionTimeout: 30,
      ipWhitelist: '10.0.0.0/8, 172.16.0.0/12',
    },
    monitoring: {
      metricResolution: '1m',
      retentionPeriod: 90,
      enableDetailedLogs: true,
    },
    apiDefaults: {
      rateLimit: 1000,
      timeout: 30,
      cacheEnabled: true,
      cacheTTL: 300,
    },
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (section, field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    // In a real application, this would save to a backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notification Settings
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Alerts"
                    secondary="Receive critical alerts via email"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.emailAlerts}
                      onChange={handleChange('notifications', 'emailAlerts')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Slack Notifications"
                    secondary="Receive alerts in Slack channel"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.slackNotifications}
                      onChange={handleChange('notifications', 'slackNotifications')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Error Rate Threshold (%)"
                    secondary="Alert when error rate exceeds threshold"
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      size="small"
                      value={settings.notifications.errorThreshold}
                      onChange={handleChange('notifications', 'errorThreshold')}
                      sx={{ width: 100 }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Latency Threshold (ms)"
                    secondary="Alert when latency exceeds threshold"
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      size="small"
                      value={settings.notifications.latencyThreshold}
                      onChange={handleChange('notifications', 'latencyThreshold')}
                      sx={{ width: 100 }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Security Settings
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemText
                    primary="Require MFA"
                    secondary="Enable two-factor authentication"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.security.requireMFA}
                      onChange={handleChange('security', 'requireMFA')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Session Timeout (minutes)"
                    secondary="Automatically logout after inactivity"
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      size="small"
                      value={settings.security.sessionTimeout}
                      onChange={handleChange('security', 'sessionTimeout')}
                      sx={{ width: 100 }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="IP Whitelist"
                    secondary="Comma-separated list of allowed IP ranges"
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      size="small"
                      value={settings.security.ipWhitelist}
                      onChange={handleChange('security', 'ipWhitelist')}
                      sx={{ width: 200 }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Monitoring Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monitoring Settings
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemText
                    primary="Metric Resolution"
                    secondary="Frequency of metric collection"
                  />
                  <ListItemSecondaryAction>
                    <FormControl size="small" sx={{ width: 100 }}>
                      <Select
                        value={settings.monitoring.metricResolution}
                        onChange={handleChange('monitoring', 'metricResolution')}
                      >
                        <MenuItem value="10s">10s</MenuItem>
                        <MenuItem value="30s">30s</MenuItem>
                        <MenuItem value="1m">1m</MenuItem>
                        <MenuItem value="5m">5m</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Retention Period (days)"
                    secondary="How long to keep historical data"
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      size="small"
                      value={settings.monitoring.retentionPeriod}
                      onChange={handleChange('monitoring', 'retentionPeriod')}
                      sx={{ width: 100 }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Detailed Logging"
                    secondary="Enable verbose logging for debugging"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.monitoring.enableDetailedLogs}
                      onChange={handleChange('monitoring', 'enableDetailedLogs')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* API Default Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                API Default Settings
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemText
                    primary="Rate Limit (requests/minute)"
                    secondary="Default rate limit for new APIs"
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      size="small"
                      value={settings.apiDefaults.rateLimit}
                      onChange={handleChange('apiDefaults', 'rateLimit')}
                      sx={{ width: 100 }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Timeout (seconds)"
                    secondary="Default request timeout"
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      size="small"
                      value={settings.apiDefaults.timeout}
                      onChange={handleChange('apiDefaults', 'timeout')}
                      sx={{ width: 100 }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Enable Caching"
                    secondary="Enable response caching by default"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.apiDefaults.cacheEnabled}
                      onChange={handleChange('apiDefaults', 'cacheEnabled')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Cache TTL (seconds)"
                    secondary="Default cache duration"
                  />
                  <ListItemSecondaryAction>
                    <TextField
                      type="number"
                      size="small"
                      value={settings.apiDefaults.cacheTTL}
                      onChange={handleChange('apiDefaults', 'cacheTTL')}
                      sx={{ width: 100 }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
