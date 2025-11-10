import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileNode } from '../types';
import { FolderIcon, FileIcon, ChevronRightIcon } from './icons/Icons';

interface FileTreeProps {
  node: FileNode;
  level?: number;
}

const FileTree: React.FC<FileTreeProps> = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);

  const isFolder = node.type === 'folder';
  const hasChildren = isFolder && node.children && node.children.length > 0;

  const handleToggle = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    }
  };

  const indentation = { paddingLeft: `${level * 24}px` };

  return (
    <div className="text-gray-300">
      <div
        className={`flex items-center p-1 rounded-md cursor-pointer hover:bg-gray-700/50 transition-colors duration-150 ${isFolder ? 'font-semibold' : ''}`}
        style={indentation}
        onClick={handleToggle}
      >
        <span className="w-6 flex items-center justify-center">
            {isFolder && hasChildren && (
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronRightIcon className="w-4 h-4 text-gray-500" />
                </motion.div>
            )}
        </span>
        <span className="w-6 flex-shrink-0 mr-2 text-indigo-400">
            {isFolder ? <FolderIcon className="w-5 h-5" /> : <FileIcon className="w-5 h-5" />}
        </span>
        <span className="truncate">{node.name}</span>
      </div>
      
      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {node.children?.map((child, index) => (
              <FileTree key={`${child.name}-${index}`} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileTree;