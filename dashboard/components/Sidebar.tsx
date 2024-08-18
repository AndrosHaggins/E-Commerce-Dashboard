"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import { SettingsModal } from './SettingsModal';
import { IconDashboard, IconReport, IconSettings } from '@tabler/icons-react';

export default function Sidebar() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const pathname = usePathname();

  // set the selected button correctly based off of url path
  useEffect(() => {
    
    if (pathname === '/') {
      setSelectedButton('Dashboard');
    } else if (pathname === '/Reports') {
      setSelectedButton('Reports');
    } else if (pathname === '/settings') {
      setSelectedButton('Settings');
    }
  }, [pathname]);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    if (buttonName === 'Settings') {
      open();
    }
  };
  // set the selected button back after closing the settings modal. 
  const handleCloseSettings = () => {
    close();
    // Reset the selected button to the current page when the modal closes
    if (pathname === '/') {
      setSelectedButton('Dashboard');
    } else if (pathname === '/Reports') {
      setSelectedButton('Reports');
    } else {
      setSelectedButton(null); // Handle appropriately if the path doesn't match
    }
  };

  return (
    <Stack p="md">
      <Button
        fullWidth
        variant={selectedButton === 'Dashboard' ? 'filled' : 'transparent'}
        onClick={() => handleButtonClick('Dashboard')}
        leftSection={<IconDashboard size={16} />}
        justify="left"
        component={Link} href="/"
      >
        Dashboard
      </Button>
      <Button
        fullWidth
        variant={selectedButton === 'Reports' ? 'filled' : 'transparent'}
        onClick={() => handleButtonClick('Reports')}
        leftSection={<IconReport size={16} />}
        justify="left"
        component={Link} href="/Reports"
      >
        Reports
      </Button>
      <Button
        fullWidth
        variant={selectedButton === 'Settings' ? 'filled' : 'transparent'}
        onClick={() => handleButtonClick('Settings')}
        leftSection={<IconSettings size={16} />}
        justify="left"
      >
        Settings
      </Button>

      {/* Modal for settings */}
      <SettingsModal opened={opened} onClose={handleCloseSettings} />
    </Stack>
  );
}
