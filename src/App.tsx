import { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { CourseList } from './components/CourseList';
import { GroupModal } from './components/GroupModal';
import type { Course, Group } from './types';
import { CURRENT_USER, MOCK_COURSES } from './mockData';
import { Activity, Users } from 'lucide-react';

function App() {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Scroll Animation for Hero Background
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        // Scale from 1.2 to 1 based on scroll
        const scale = Math.max(1, 1.2 - (scrollY / 500) * 0.2);
        heroRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance Animation
  useEffect(() => {
    anime({
      targets: heroContentRef.current?.children,
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });
  }, []);

  const handleOpenCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCourse(null), 200);
  };

  const handleJoinGroup = (group: Group) => {
    if (!selectedCourse) return;

    // Check if user already joined ANY group in this course
    const hasJoinedAnyGroup = selectedCourse.groups.some(g => 
      g.members.some(m => m.id === CURRENT_USER.id)
    );

    if (hasJoinedAnyGroup) return; // Should be blocked by UI, but safety check

    const updatedGroups = selectedCourse.groups.map(g => {
      if (g.id === group.id) {
        return { ...g, members: [...g.members, CURRENT_USER] };
      }
      return g;
    });

    const updatedCourse = { ...selectedCourse, groups: updatedGroups };
    setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
    setSelectedCourse(updatedCourse);
  };

  const handleLeaveGroup = (group: Group) => {
    if (!selectedCourse) return;

    const updatedGroups = selectedCourse.groups.map(g => {
      if (g.id === group.id) {
        return { ...g, members: g.members.filter(m => m.id !== CURRENT_USER.id) };
      }
      return g;
    });

    const updatedCourse = { ...selectedCourse, groups: updatedGroups };
    setCourses(courses.map(c => c.id === selectedCourse.id ? updatedCourse : c));
    setSelectedCourse(updatedCourse);
  };

  return (
    <div className="min-h-screen bg-aurora-bg overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center overflow-hidden">
        {/* Aurora Background */}
        <div 
          ref={heroRef}
          className="absolute inset-0 bg-aurora-gradient opacity-80 blur-[120px] origin-center will-change-transform"
          style={{ transform: 'scale(1.2)' }}
        ></div>
        
        <div className="absolute inset-0 bg-white/30 mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full" ref={heroContentRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-aurora-highlight/10 text-aurora-highlight rounded-full text-xs font-bold tracking-wider mb-6">
                2026 春季学期
              </div>
              <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-2 tracking-tight">
                脑科学<br/>
                <span className="text-aurora-highlight">前沿协作</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-8 font-light tracking-wide">
                连接北大心理与认知科学学院与北航生物医学工程学院，促进跨学科交流与合作。
              </p>
            </div>

            {/* KPI / Stats Area */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-white/50 shadow-xl">
                <Activity className="w-8 h-8 text-aurora-highlight mb-4" />
                <div className="text-5xl font-bold text-aurora-text mb-1">3</div>
                <div className="text-xs text-gray-400 mt-1">核心课程</div>
              </div>
              <div className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl border border-white/50 shadow-xl">
                <Users className="w-8 h-8 text-aurora-highlight mb-4" />
                <div className="text-5xl font-bold text-aurora-text mb-1">150+</div>
                <div className="text-xs text-gray-400 mt-1">活跃研究小组</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-20 relative z-20">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-white">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">热门课程</h2>
            </div>
          </div>
          
          <CourseList 
            courses={courses} 
            onJoinCourse={handleOpenCourse} 
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2026 NeuroLab. All rights reserved.</p>
        </div>
      </footer>

      <GroupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        course={selectedCourse}
        currentUser={CURRENT_USER}
        onJoinGroup={handleJoinGroup}
        onLeaveGroup={handleLeaveGroup}
      />
    </div>
  );
}

export default App;
