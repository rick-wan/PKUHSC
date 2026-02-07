import React from 'react';
import type { Course, Group, User } from '../types';
import { GroupCard } from './GroupCard';
import { X } from 'lucide-react';

interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  currentUser: User;
  onJoinGroup: (group: Group) => void;
  onLeaveGroup: (group: Group) => void;
}

export const GroupModal: React.FC<GroupModalProps> = ({ 
  isOpen, 
  onClose, 
  course, 
  currentUser,
  onJoinGroup,
  onLeaveGroup
}) => {
  if (!isOpen || !course) return null;

  // 查找当前用户在该课程下加入的小组 ID
  const joinedGroup = course.groups.find(g => 
    g.members.some(m => m.id === currentUser.id)
  );
  const joinedGroupId = joinedGroup?.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">选择小组</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">当前课程：</span>
              <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{course.title}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {course.groups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {course.groups.map(group => (
                <GroupCard
                  key={group.id}
                  group={group}
                  currentUser={currentUser}
                  joinedGroupId={joinedGroupId}
                  onJoin={onJoinGroup}
                  onLeave={onLeaveGroup}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <X className="w-8 h-8" />
              </div>
              <p className="text-gray-500 font-medium">暂无小组开放</p>
              <p className="text-sm text-gray-400 mt-1">请稍后查看或联系管理员</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-white text-center">
           <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
             每组限 3 人
             <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
             需包含北大/北航双重角色
             <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
             每人限加入一个小组
           </p>
        </div>
      </div>
    </div>
  );
};
