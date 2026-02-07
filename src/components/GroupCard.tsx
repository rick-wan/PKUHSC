import React from 'react';
import type { Group, User } from '../types';
import { cn } from '../lib/utils';
import { Plus, LogOut } from 'lucide-react';

interface GroupCardProps {
  group: Group;
  currentUser: User;
  joinedGroupId?: string;
  onJoin: (group: Group) => void;
  onLeave: (group: Group) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ 
  group, 
  currentUser, 
  joinedGroupId, 
  onJoin, 
  onLeave 
}) => {
  const currentCount = group.members.length;
  const isFull = currentCount >= group.maxMembers;
  const isJoined = joinedGroupId === group.id;
  const hasJoinedOther = !!joinedGroupId && !isJoined;
  
  // 冲突检测
  const pkuCount = group.members.filter(m => m.role === 'PKU').length;
  const buaaCount = group.members.filter(m => m.role === 'BUAA').length;
  
  let canJoin = !isFull && !hasJoinedOther;
  let conflictReason = '';

  if (canJoin && !isJoined) {
    if (currentUser.role === 'PKU' && pkuCount >= group.maxMembers - 1) {
      canJoin = false;
      conflictReason = '需北航同学';
    } else if (currentUser.role === 'BUAA' && buaaCount >= group.maxMembers - 1) {
      canJoin = false;
      conflictReason = '需北大同学';
    }
  }

  // 渲染坑位
  const slots = Array.from({ length: group.maxMembers });

  return (
    <div className={cn(
      "bg-white rounded-xl border p-5 flex flex-col gap-4 transition-all duration-300",
      isJoined ? "border-aurora-highlight shadow-md ring-1 ring-aurora-highlight/20" : "border-gray-200 hover:border-aurora-highlight/30 hover:shadow-sm"
    )}>
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-aurora-text">{group.name}</h4>
        <span className={cn(
          "text-xs font-medium px-2.5 py-1 rounded-full",
          isJoined ? "bg-aurora-highlight/10 text-aurora-highlight" :
          isFull ? "bg-gray-100 text-gray-500" : "bg-green-50 text-green-700"
        )}>
          {isJoined ? '已加入' : `${currentCount}/${group.maxMembers}`}
        </span>
      </div>

      <div className="flex gap-3 justify-between">
        {slots.map((_, index) => {
          const member = group.members[index];
          if (member) {
            const isPKU = member.role === 'PKU';
            return (
              <div key={member.id} className="relative flex flex-col items-center gap-1 w-16">
                <div className={cn(
                  "w-12 h-12 rounded-full p-0.5 border-2 overflow-hidden transition-transform hover:scale-105",
                  isPKU ? "border-red-700" : "border-blue-600"
                )}>
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <span className="text-xs text-gray-600 truncate w-full text-center font-medium">{member.name}</span>
                <span className={cn(
                  "absolute -top-1 -right-1 text-[10px] font-bold px-1.5 rounded-full text-white border-2 border-white shadow-sm",
                  isPKU ? "bg-red-700" : "bg-blue-600"
                )}>
                  {isPKU ? '北大' : '北航'}
                </span>
              </div>
            );
          } else {
            return (
              <div key={`empty-${index}`} className="flex flex-col items-center gap-1 w-16 opacity-60">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300 bg-gray-50">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-400">空闲</span>
              </div>
            );
          }
        })}
      </div>

      {isJoined ? (
        <button
          onClick={() => onLeave(group)}
          className="w-full py-2.5 rounded-lg text-sm font-medium transition-colors bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 flex items-center justify-center gap-2 group"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          退出小组
        </button>
      ) : (
        <button
          onClick={() => canJoin && onJoin(group)}
          disabled={!canJoin}
          className={cn(
            "w-full py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm",
            canJoin
              ? "bg-aurora-text text-white hover:bg-black hover:shadow"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          {hasJoinedOther ? '已加入其他小组' : isFull ? '名额已满' : canJoin ? '立即加入' : conflictReason}
        </button>
      )}
    </div>
  );
};
