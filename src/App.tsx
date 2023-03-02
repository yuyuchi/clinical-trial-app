import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout, Breadcrumb } from 'antd';
import Participants from './pages/Participants';

const queryClient = new QueryClient();
const { Header, Footer, Content } = Layout;
const { Item } = Breadcrumb;

export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Layout className="layout">
          <Header style={{ color: 'white' }}>Clinical Trial Admin Panel</Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Item>Home</Item>
              <Item>List of trials</Item>
              <Item>New Beginnings</Item>
            </Breadcrumb>

            <Participants />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2023 Created by Yuchi Yu
          </Footer>
        </Layout>
      </QueryClientProvider>
    </div>
  );
}
