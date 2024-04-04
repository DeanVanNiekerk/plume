import { useToast } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { DragEvent } from 'react';

type FileChangeEvent = ChangeEvent & {
  target: {
    files: FileList | null;
    value: unknown;
  };
};

export function useOnFileChange(
  handleFiles: (files: File[]) => void,
  maxFiles = 10,
  maxSize: number | undefined = undefined,
) {
  const toast = useToast();

  return (e: FileChangeEvent | DragEvent) => {
    e.preventDefault();
    const eventFiles = getFilesFromEvent(e);
    if (!eventFiles || !eventFiles[0]) return;
    const files = [];
    if (eventFiles.length > maxFiles) {
      toast({
        status: 'error',
        description: `Too many files selected. Max files: ${maxFiles}`,
      });

      return;
    }
    for (let i = 0; i < eventFiles.length; i++) {
      const file = eventFiles.item(i);

      if (!file) continue;

      if (maxSize && file.size > maxSize) {
        toast({
          status: 'error',
          description: `Max file size of ${maxSize / 1000000}MB exceeded`,
        });
        return;
      }
      files.push(file);
    }

    // Reset file input
    resetEventValue(e);

    handleFiles(files);
  };
}

const getFilesFromEvent = (e: FileChangeEvent | DragEvent): FileList | null => {
  if (isFileDragEvent(e)) {
    return e.dataTransfer.files ?? null;
  }
  if (isFileChangeEvent(e)) {
    return e.target.files ?? null;
  }
  return null;
};

const resetEventValue = (e: FileChangeEvent | DragEvent) => {
  if (isFileChangeEvent(e)) {
    e.target.value = null;
  }
  if (isFileDragEvent(e)) {
    e.dataTransfer.clearData();
  }
};

const isFileChangeEvent = (e: FileChangeEvent | DragEvent): e is FileChangeEvent => Object.hasOwn(e, 'target');
const isFileDragEvent = (e: FileChangeEvent | DragEvent): e is DragEvent => Object.hasOwn(e, 'dataTransfer');
