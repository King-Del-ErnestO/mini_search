'use client';

import React from 'react';
import { User, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PostCard } from './PostCard';
import { UserGroup } from '@/types';

interface UserGroupCardProps {
  userGroup: UserGroup;
}

export const UserGroupCard: React.FC<UserGroupCardProps> = ({ userGroup }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User {userGroup.user}
          </CardTitle>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            {userGroup.postCount} posts • Avg title length: {userGroup.averageTitleLength.toFixed(1)} chars
          </div>
        </div>
        
        {userGroup.hasLongTitles && (
          <Alert variant="default" className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              This user has posts with long titles
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-3 mb-4">
          {userGroup.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {userGroup.longestTitle && (
          <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-300">
            <div className="text-sm font-medium text-blue-900">
              Longest Title ({userGroup.longestTitle.titleLength} chars):
            </div>
            <div className="text-sm text-blue-800">
&quot;{userGroup.longestTitle.title}&quot;
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
