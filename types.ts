
export type TerminalLineType = 'command' | 'output' | 'error' | 'system';

export interface TerminalLine {
  id: string;
  type: TerminalLineType;
  content: string;
  timestamp: Date;
  command?: string;
  path?: string;
}

export interface VFSNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: VFSNode[];
  size?: number;
  permissions?: string;
  owner?: string;
}

export interface VirtualFS {
  root: VFSNode;
  currentPath: string;
}