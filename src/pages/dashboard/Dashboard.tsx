import '../../App.css';

import { Loader, Title } from '@mantine/core';
type Props = {};

const Dashboard = (props: Props) => (
  <div className="App">
    <header className="App-header">
      <Title order={1} pb={40}>
        Tulavi Fakini Webshop- Development in progress
      </Title>
      <Loader size={128} />
    </header>
  </div>
);

export default Dashboard;
