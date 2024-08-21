'use client';
import { Menu, UnstyledButton, Group, useMantineColorScheme, MantineColorScheme, Text } from '@mantine/core';
import { IconChevronDown, IconCheck } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  // Access the current color scheme and the function to change it
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  // Function to update the color scheme when a menu item is selected
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
