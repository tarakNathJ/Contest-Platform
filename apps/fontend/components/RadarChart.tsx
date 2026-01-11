
import React from 'react';
import {
  Radar, RadarChart, PolarGrid,
  PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import { SkillData } from '../types';

interface RadarChartProps {
  data: SkillData[];
}

const SkillsRadar: React.FC<RadarChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#1e293b" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
          />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsRadar;
