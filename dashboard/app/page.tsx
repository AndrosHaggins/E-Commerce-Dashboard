"use client"
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Group, AppShell, Burger, Title, Box} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Dashboard from '@/components/Dashboard';
import Sidebar from '@/components/Sidebar';


export default function HomePage() {
  // State management for controlling the mobile and desktop sidebar visibility
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header >
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <Title order={2}>BarkMart</Title>
        </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
        
          <Box>
          <Sidebar/>
          </Box>
         
        </AppShell.Navbar>
        <AppShell.Main>
        <Dashboard/>
       
        </AppShell.Main>
      </AppShell>
    </>
  );
}
