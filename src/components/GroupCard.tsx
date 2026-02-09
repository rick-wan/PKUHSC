import React from 'react';
import type { Group, User } from '../types';
import { cn } from '../lib/utils';
import { Plus, LogOut, ArrowRight } from 'lucide-react';

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
      "group relative flex flex-col gap-5 p-6 rounded-3xl border transition-all duration-300",
      isJoined 
        ? "bg-white border-aurora-highlight shadow-lg shadow-aurora-highlight/10 scale-[1.02]" 
        : "bg-white/60 border-gray-100 hover:border-aurora-highlight/30 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1"
    )}>
      {/* Decorative Blur */}
      {isJoined && (
        <div className="absolute inset-0 bg-aurora-highlight/5 rounded-3xl blur-xl -z-10"></div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h4 className={cn(
            "text-lg font-bold mb-1 transition-colors",
            isJoined ? "text-aurora-highlight" : "text-aurora-text group-hover:text-aurora-highlight"
          )}>{group.name}</h4>
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
              isFull ? "bg-gray-100 text-gray-400" : "bg-green-100 text-green-600"
            )}>
              {isFull ? '已满员' : '可加入'}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-3xl font-bold text-gray-900 leading-none">
            {currentCount}<span className="text-sm text-gray-400 font-normal">/{group.maxMembers}</span>
          </span>
        </div>
      </div>

      {/* Members Grid */}
      <div className="flex justify-between items-center gap-2 bg-gray-50/50 rounded-2xl p-3 border border-gray-100/50">
        {slots.map((_, index) => {
          const member = group.members[index];
          if (member) {
            const isPKU = member.role === 'PKU';
            return (
              <div key={member.id} className="relative group/member flex flex-col items-center w-full">
                <div className={cn(
                  "w-12 h-12 rounded-full p-0.5 border-2 overflow-hidden transition-all duration-300 relative z-10",
                  isPKU ? "border-red-500/30 group-hover/member:border-red-500" : "border-blue-500/30 group-hover/member:border-blue-500"
                )}>
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className={cn(
                  "absolute -bottom-2 px-1.5 py-0.5 rounded text-[9px] font-bold text-white shadow-sm z-20 scale-90 opacity-0 group-hover/member:scale-100 group-hover/member:opacity-100 transition-all",
                  isPKU ? "bg-red-500" : "bg-blue-500"
                )}>
                  {isPKU ? 'PKU' : 'BUAA'}
                </div>
                <span className="text-[10px] text-gray-500 mt-1 font-medium truncate max-w-[4rem]">{member.name}</span>
              </div>
            );
          } else {
            return (
              <div key={`empty-${index}`} className="flex flex-col items-center w-full">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 bg-white group-hover:border-gray-300 transition-colors">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-gray-300 mt-1 font-medium">空缺</span>
              </div>
            );
          }
        })}
      </div>

      {/* Action Button */}
      <div className="mt-auto pt-2">
        {isJoined ? (
          <div className="flex gap-3">
            <button
              onClick={() => onLeave(group)}
              className="flex-1 py-3 rounded-xl text-sm font-bold transition-all bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow-red-500/20"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
              退出小组
            </button>
            <button
              onClick={() => window.open(`/group/${group.id}`, '_blank')}
              className="flex-[1.5] py-3 rounded-xl text-sm font-bold transition-all bg-aurora-text text-white hover:bg-aurora-highlight hover:shadow-lg hover:shadow-aurora-highlight/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group/enter shadow-sm"
            >
              进入小组空间
              <ArrowRight className="w-4 h-4 transition-transform group-hover/enter:translate-x-1" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => canJoin && onJoin(group)}
            disabled={!canJoin}
            className={cn(
              "w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm",
              canJoin
                ? "bg-aurora-text text-white hover:bg-aurora-highlight hover:shadow-lg hover:shadow-aurora-highlight/20 hover:-translate-y-0.5 active:translate-y-0"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            {canJoin ? (
              <>
                加入小组
                <Plus className="w-4 h-4" />
              </>
            ) : (
              <span className="flex items-center gap-1">
                {isFull ? '已满员' : hasJoinedOther ? '已加入其他组' : conflictReason || '不可加入'}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
