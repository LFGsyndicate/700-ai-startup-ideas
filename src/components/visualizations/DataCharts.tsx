
import { useState } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LabelList
} from 'recharts';
import { useLanguage } from '@/hooks/use-language';
import { AgentArchetype, Industry, StartupIdea } from '@/types';

interface DataChartsProps {
  ideas: StartupIdea[];
}

export function DataCharts({ ideas }: DataChartsProps) {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Data for visualizations
  const industryData = Object.values(Industry).map(industry => {
    const count = ideas.filter(idea => idea.industry === industry).length;
    return { 
      name: industry.split(' & ')[0],
      displayName: t(`industry.${industry.split(' & ')[0].toLowerCase()}`),
      value: count,
      percentage: ((count / ideas.length) * 100).toFixed(0) + '%'
    };
  });
  
  const archetypeData = Object.values(AgentArchetype).map(archetype => {
    const count = ideas.filter(idea => idea.archetype === archetype).length;
    return { 
      name: archetype.split(' ')[0],
      displayName: t(`archetype.${archetype.split(' ')[0].toLowerCase()}`),
      value: count 
    };
  });
  
  const COLORS = [
    '#10B981', '#34D399', '#6EE7B7', '#A7F3D0', 
    '#D1FAE5', '#059669', '#047857', '#065F46', 
    '#064E3B', '#022C22', '#22c55e'
  ];

  // Event handlers
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };
  
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, displayName, percentage } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    
    // Only show label if slice is big enough
    if (parseFloat(percentage) < 3) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#0f172a" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {displayName} {percentage}
      </text>
    );
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Industry Distribution Pie Chart */}
      <div className="glass-card p-6 card-hover">
        <h3 className="text-lg font-medium mb-4 text-center">
          {t('home.distribution_by_industry')}
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={industryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={90}
                fill="#10B981"
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                paddingAngle={1}
              >
                {industryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderColor: '#10B981',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  color: '#0f172a',
                  padding: '8px 12px',
                }}
                formatter={(value, name, props) => {
                  return [`${value} (${((value as number / ideas.length) * 100).toFixed(1)}%)`, props.payload.displayName];
                }}
                labelFormatter={() => t('home.ideas_count')}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Agent Archetype Distribution Bar Chart */}
      <div className="glass-card p-6 card-hover">
        <h3 className="text-lg font-medium mb-4 text-center">
          {t('home.ideas_by_archetype')}
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={archetypeData} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
              <XAxis 
                type="number" 
                tick={{ fill: '#0f172a', fontSize: 12 }}
                tickLine={{ stroke: 'rgba(15, 23, 42, 0.2)' }}
                axisLine={{ stroke: 'rgba(15, 23, 42, 0.3)' }}
              />
              <YAxis 
                type="category" 
                dataKey="displayName" 
                width={90}
                tick={{ fill: '#0f172a', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(15, 23, 42, 0.3)' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderColor: '#10B981',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  color: '#0f172a',
                  padding: '8px 12px',
                }}
                formatter={(value) => [value, t('home.ideas_count')]}
              />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]}
                animationBegin={200}
                animationDuration={1000}
              >
                {archetypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <LabelList 
                  dataKey="value"
                  position="right"
                  style={{ fill: '#0f172a', fontSize: 12, fontWeight: 500 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
