'use client';
/**
 * A component that provides a dropdown menu for selecting the application's color scheme.
 * Users can choose between 'Light', 'Dark', and 'Auto' modes.
 * The selected color scheme is reflected across the app and is managed using Mantine's color scheme context.
 */
import { Menu, UnstyledButton, Group, useMantineColorScheme, MantineColorScheme, Text, Button } from '@mantine/core';
import { IconChevronDown, IconCheck } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const handleColorSchemeChange = (value: MantineColorScheme) => {
    setColorScheme(value);
  };

  return (
    <Group  >
      <Menu>
        <Menu.Target>
          <UnstyledButton>
            <Group gap={5}>
              <Text>{colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}</Text>
              <IconChevronDown size={14} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => handleColorSchemeChange('light')}
            rightSection={colorScheme === 'light' ? <IconCheck size={14} /> : null}
          >
            Light
          </Menu.Item>
          <Menu.Item
            onClick={() => handleColorSchemeChange('dark')}
            rightSection={colorScheme === 'dark' ? <IconCheck size={14} /> : null}
          >
            Dark
          </Menu.Item>
          <Menu.Item
            onClick={() => handleColorSchemeChange('auto')}
            rightSection={colorScheme === 'auto' ? <IconCheck size={14} /> : null}
          >
            Auto
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
