import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingChat: React.FC = () => {
  const { isChatOpen, setChatOpen } = useApp();

  // Position state (persisted in localStorage)
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    try {
      const saved = localStorage.getItem('bedha_chat_pos');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { x: -1, y: -1 }; // -1 indicates default bottom-right
  });

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const hasMovedRef = useRef(false);

  // Initialize default bottom-right based on window size
  useEffect(() => {
    if (position.x === -1 || position.y === -1) {
      const initX = window.innerWidth - 84;
      const initY = window.innerHeight - 150; // above mobile bottom bar
      setPosition({ x: Math.max(16, initX), y: Math.max(16, initY) });
    }
  }, []);

  const handlePointerDown = (clientX: number, clientY: number) => {
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      initialX: position.x,
      initialY: position.y
    };
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!dragStartRef.current) return;
    const dx = clientX - dragStartRef.current.startX;
    const dy = clientY - dragStartRef.current.startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMovedRef.current = true;
    }

    const newX = Math.min(Math.max(12, dragStartRef.current.initialX + dx), window.innerWidth - 76);
    const newY = Math.min(Math.max(12, dragStartRef.current.initialY + dy), window.innerHeight - 80);

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
    try {
      localStorage.setItem('bedha_chat_pos', JSON.stringify(position));
    } catch (e) {}
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.stopPropagation();
      return;
    }
    setChatOpen(!isChatOpen);
  };

  // Mouse drag listeners
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handlePointerDown(e.clientX, e.clientY);

    const onMouseMove = (moveEvent: MouseEvent) => {
      handlePointerMove(moveEvent.clientX, moveEvent.clientY);
    };

    const onMouseUp = () => {
      handlePointerUp();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Touch drag listeners
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handlePointerDown(touch.clientX, touch.clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handlePointerMove(touch.clientX, touch.clientY);
  };

  const onTouchEnd = () => {
    handlePointerUp();
  };

  if (position.x === -1) return null;

  return (
    <div
      ref={buttonRef}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 45
      }}
      className="touch-none select-none"
    >
      <button
        onClick={handleClick}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={`group relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl p-1 shadow-2xl transition-all duration-200 cursor-grab active:cursor-grabbing flex items-center justify-center bg-white border-2 ${
          isChatOpen ? 'border-blue-600 ring-4 ring-blue-100' : 'border-blue-400 hover:border-blue-600'
        } ${isDragging ? 'scale-105 opacity-90' : 'hover:scale-105 active:scale-95'}`}
        aria-label="Open BEDHA AI Chat"
        title="BEDHA AI Assistant (Drag to reposition)"
      >
        {/* BEDHA Main Logo image */}
        <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center bg-white">
          <img
            src="/assets/brand/bedha_logo.jpg"
            alt="BEDHA Chat"
            className="w-full h-full object-contain p-0.5 pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Pulse Beacon */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white"></span>
        </span>
      </button>
    </div>
  );
};
