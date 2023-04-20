/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-one-expression-per-line */
import { ContextClass } from '@/Types';
import React, { useEffect, useState } from 'react';

export default function Context() {
  const [map, changeValues] = useState(ContextClass.getMap());

  useEffect(() => {
    setInterval(() => changeValues(ContextClass.getMap()), 100);
  }, []);

  if (Array.from(map.keys()).length === 0) return (<div>...</div>);

  return (
    <div id="context">
      {
        Array.from(map.entries()).map((tuple: [string, string]) => {
          const key = tuple[0];
          const value = tuple[1];
          return (
            <div className="context-variable" key={key}>
              {`${key}:`}
              {`\n${value}`}
            </div>
          );
        })
      }
    </div>
  );
}
