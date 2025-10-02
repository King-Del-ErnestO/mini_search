'use client';

import React from 'react';
import { FileText, Hash } from 'lucide-react';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="border-l-4 border-blue-200 pl-4 py-2 hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium text-foreground text-sm flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          {post.title}
          {post.hasLongTitle && (
            <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
              Long Title
            </span>
          )}
        </h3>
        <span className="text-xs text-muted-foreground">
          {post.titleLength} chars
        </span>
      </div>
      <p className="text-muted-foreground text-sm">{post.excerpt}</p>
      <div className="text-xs text-muted-foreground/70 mt-1 flex items-center gap-2">
        <span className="flex items-center gap-1">
          <Hash className="h-3 w-3" />
          Post ID: {post.id}
        </span>
        <span>Body: {post.bodyLength} chars</span>
      </div>
    </div>
  );
};
