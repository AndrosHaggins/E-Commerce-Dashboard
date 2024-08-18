"use client";
import { Modal, Text, Group, Divider } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle/ColorSchemeToggle';

interface SettingsModalProps {
  opened: boolean;
  onClose: () => void;
}

export function SettingsModal({ opened, onClose }: SettingsModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Settings"
      centered
    >
   
      <Divider  />

      <Group justify="space-between" pt={20} pb={20}>
        <Text>Theme</Text>
        <ColorSchemeToggle />
      </Group>
    </Modal>
  );
}
