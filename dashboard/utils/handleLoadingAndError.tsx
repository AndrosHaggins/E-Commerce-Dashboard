import { Center, Loader, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

/**
 * handleLoadingAndError
 * 
 * A utility function that handles loading states and errors across multiple data fetching hooks.
 * It returns a Loader component if any of the loading states are true, or an Alert component
 * if any errors are present. If neither, it returns null, allowing the parent component to render normally.
 * 
 * @param {boolean[]} loadingStates - An array of booleans representing the loading states from different hooks.
 * @param {(Error | null)[]} errors - An array of errors from different hooks.
 * @returns {JSX.Element | null} A Loader, an Alert, or null depending on the state.
 */
export function handleLoadingAndError(loadingStates: boolean[], errors: (Error | null)[]) {
  if (loadingStates.some(loading => loading)) {
    return (
      <Center style={{ minHeight: '100vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  for (const error of errors) {
    if (error) {
      return (
        <Center style={{ minHeight: '100vh' }}>
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" radius="md" variant="filled">
            {error.message}
          </Alert>
        </Center>
      );
    }
  }

  return null;
}
