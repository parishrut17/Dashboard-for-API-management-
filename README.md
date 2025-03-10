# API Management Dashboard

A modern, sleek dashboard for enterprise API management that provides a bird's eye view of your API ecosystem, including metrics, AWS cloud consumption, and other key performance indicators.

## Features

- Comprehensive API inventory and management
- Real-time performance metrics visualization
- AWS cloud resource consumption tracking
- API health monitoring and alerting
- Usage analytics and trends
- Cost optimization insights

## Tech Stack

- React.js with Vite for frontend
- Material UI for sleek, modern UI components
- Recharts for data visualization
- AWS SDK for cloud metrics integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd api-management-dashboard

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

### Configuration

Create a `.env` file in the root directory with your AWS credentials and other configuration:

```
VITE_AWS_ACCESS_KEY_ID=your_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_secret_key
VITE_AWS_REGION=your_region
```

## Build for Production

```bash
npm run build
# or
yarn build
```

## License

MIT
