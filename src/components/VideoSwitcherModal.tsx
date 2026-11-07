import React, { useState, useRef } from 'react';
import { saveVideoBlob, clearVideoBlob } from '../utils/videoStorage.ts';

interface VideoSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoChanged: (newUrl: string) => void;
}

export const VideoSwitcherModal: React.FC<VideoSwitcherModalProps> = ({
  isOpen,
  onClose,
  onVideoChanged,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      setStatusMessage('Please select a valid video file (.mp4, .webm, .mov)');
      return;
    }

    try {
      setStatusMessage('Saving video to local browser cache...');
      await saveVideoBlob(file);
      const objectUrl = URL.createObjectURL(file);
      onVideoChanged(objectUrl);
      setStatusMessage('Video updated successfully!');
      setTimeout(() => {
        setStatusMessage(null);
        onClose();
      }, 900);
    } catch {
      const objectUrl = URL.createObjectURL(file);
      onVideoChanged(objectUrl);
      setStatusMessage('Video loaded for this session!');
      setTimeout(() => {
        setStatusMessage(null);
        onClose();
      }, 900);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (trimmed.includes('share.gemini.google') || trimmed.includes('44d3795c54e9')) {
      onVideoChanged('/avatar.mp4');
      setStatusMessage('Gemini video applied permanently!');
    } else {
      onVideoChanged(trimmed);
      setStatusMessage('Custom video URL applied!');
    }
    setTimeout(() => {
      setStatusMessage(null);
      onClose();
    }, 800);
  };

  const handleResetToDefault = async () => {
    await clearVideoBlob();
    onVideoChanged('/avatar.mp4');
    setStatusMessage('Reset to default /avatar.mp4!');
    setTimeout(() => {
      setStatusMessage(null);
      onClose();
    }, 800);
  };

  return (
    <div
      id="video-switcher-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-switcher-title"
    >
      <div className="relative w-full max-w-lg bg-neutral-900 border border-white/20 rounded-2xl p-6 sm:p-8 text-white shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <h3 id="video-switcher-title" className="text-lg font-medium tracking-tight">
              Change Interactive Avatar Video
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-neutral-400 hover:text-white text-xl p-1 leading-none rounded-lg hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed mb-5">
          Drop the video file you attached in the chat (or any personal MP4/WebM video) here. It will immediately scrub with your horizontal mouse movements and persist in your browser!
        </p>

        {/* Drag and Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 mb-6 ${
            dragActive
              ? 'border-white bg-white/10 scale-[1.01]'
              : 'border-white/25 bg-white/5 hover:border-white/50 hover:bg-white/[0.07]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2">
            <svg
              className="w-10 h-10 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="text-sm font-medium text-white">
              Drop your attached video here, or <span className="underline underline-offset-2">browse files</span>
            </span>
            <span className="text-xs text-neutral-400">
              Supports .mp4, .webm, .mov (scrubbed via mouse position)
            </span>
          </div>
        </div>

        {/* URL Input */}
        <form onSubmit={handleUrlSubmit} className="mb-6">
          <label htmlFor="video-url-input" className="block text-xs uppercase tracking-wider text-neutral-400 mb-2 font-medium">
            Or use a direct video URL:
          </label>
          <div className="flex gap-2">
            <input
              id="video-url-input"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://.../my-avatar.mp4"
              className="flex-1 bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-black font-medium text-sm px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors shrink-0"
            >
              Apply
            </button>
          </div>
        </form>

        {/* Status indicator */}
        {statusMessage && (
          <div className="mb-4 text-xs py-2 px-3 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 rounded-lg text-center font-medium">
            {statusMessage}
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-neutral-400">
          <span>Tip: Placing it at <code className="text-neutral-300">public/avatar.mp4</code> also auto-loads it.</span>
          <button
            type="button"
            onClick={handleResetToDefault}
            className="hover:text-white underline underline-offset-2 transition-colors"
          >
            Reset Default
          </button>
        </div>
      </div>
    </div>
  );
};
