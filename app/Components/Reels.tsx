'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlayIcon } from '@heroicons/react/24/solid';

interface DemoVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
}

const DemoVideos = () => {
  const [videos, setVideos] = useState<DemoVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://6991a6e96279728b01550164.mockapi.io/songs/DemoVideos');
        if (!response.ok) throw new Error('Error fetching data');
        const data = await response.json();
        setVideos(data);
        setError(null);
      } catch (err) {
        setError('Failed to load demo videos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <div className="text-center py-16 text-white">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;

  return (
    <section className="bg-[#1d1919] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="w-full md:w-[60%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col">
              <div className="relative w-full aspect-video bg-gray-800 cursor-pointer">
                {playingId === video.id ? (
                  // Video element with poster to show thumbnail before playback
                  <video
                    src={video.videoUrl}
                    controls
                    autoPlay
                    poster={video.thumbnail} // اینجا خیلی مهمه
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <>
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover rounded"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        onClick={() => setPlayingId(video.id)}
                        className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
                      >
                        <PlayIcon className="w-8 h-8 text-[#1d1919]" />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4 text-right">
                <h3 className="text-lg font-medium text-white mb-2">{video.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoVideos;
