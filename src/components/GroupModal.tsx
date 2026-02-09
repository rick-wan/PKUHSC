import React from 'react';
import type { Course, Group, User } from '../types';
import { GroupCard } from './GroupCard';
import { X, Users, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

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
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />
      
      <div className="relative bg-white/90 backdrop-blur-xl rounded-[2rem] w-full max-w-5xl max-h-[85vh] flex flex-col shadow-2xl border border-white/50 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-8 pb-4 border-b border-gray-100/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-aurora-highlight/10 text-aurora-highlight text-xs font-bold rounded-full tracking-wider uppercase">
                2026 春季学期
              </span>
              <span className="text-gray-400 text-sm font-medium flex items-center gap-1">
                <Users className="w-4 h-4" />
                {course.groups.length} 个小组
              </span>
            </div>
            <h2 className="text-3xl font-bold text-aurora-text tracking-tight">{course.title}</h2>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-all hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {course.groups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">暂无小组开放</h3>
              <p className="text-gray-500 max-w-xs mx-auto">该课程暂时没有开放的小组，请稍后查看或联系课程助教。</p>
            </div>
          )}
        </div>
        
        {/* Footer Info */}
        <div className="p-4 bg-gray-50/50 border-t border-gray-100/50 backdrop-blur-sm">
           <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium text-gray-500">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-aurora-highlight"></div>
                <span>每组限 3 人</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>北大 (PKU)</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>北航 (BUAA)</span>
             </div>
             <div className="flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-gray-400" />
                <span>每人限加入一个小组</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
