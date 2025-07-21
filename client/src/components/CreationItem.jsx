import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Trash2 } from 'lucide-react';

const CreationItem = ({ item, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 w-full bg-white border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Prompt & Date */}
        <div className="flex-1 w-full">
          <h2 className="text-base font-medium text-gray-800 break-words">
            {item.prompt}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Type + Trash */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-3 py-1 text-xs rounded-full">
            {item.type}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="bg-red-100 text-red-600 hover:bg-red-200 p-1 rounded-full"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Content Preview */}
      {expanded && (
        <div className="mt-4">
          {item.type === 'image' ? (
            <img
              src={item.content}
              alt="Generated"
              className="w-full max-w-md rounded-md object-contain"
            />
          ) : (
            <div className="mt-2 max-h-60 overflow-y-auto text-sm text-slate-700">
              <div className="prose prose-sm">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
