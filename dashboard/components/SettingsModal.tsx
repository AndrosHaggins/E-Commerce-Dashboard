"use client";
import { Modal, Text, Group, Divider } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle/ColorSchemeToggle';

interface SettingsModalProps {
  opened: boolean;
  onClose: () => void;
}
/**
 * SettingsModal Component
 * 
 * This component renders a modal dialog for application settings.
 * It includes a toggle for changing the theme (light/dark mode).
 * 
 * @param {boolean} opened - Controls whether the modal is open or closed.
 * @param {() => void} onClose - Callback function to close the modal.
 */
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
