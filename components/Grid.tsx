import React from 'react';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';

const Grid = () => {
  return (
    <section id='about'>
      <BentoGrid>
        {[
          { title: 'Title 1', description: 'Description 1', id: 1 },
        ].map((item) => (
          <BentoGridItem
            id={item.id}
            key={item.id}
            title={item.title}
            description={item.description}
            header={<div>Header</div>}
            icon={<div>Icon</div>}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;