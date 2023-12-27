// import { GraphQLSchema } from 'graphql';
import React, { useState } from 'react';

export const SchemaExplorer = ({ schema }: { schema: object }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const renderNode = (node: object, nodeName: string) => {
    if (typeof node === 'object' && node !== null) {
      return <SchemaExplorer schema={node} />;
    } else {
      return (
        <div>
          <span>{nodeName}:</span> <span>{String(node)}</span>
        </div>
      );
    }
  };

  const renderObject = () => {
    return (
      <div style={{ marginLeft: '20px' }}>
        {Object.keys(schema).map((key) => (
          <div key={key}>
            <span onClick={toggleCollapse} style={{ cursor: 'pointer' }}>
              {collapsed ? '▶' : '▼'} {key}:
            </span>
            {!collapsed && key && renderNode(schema[key as keyof object], key)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <span onClick={toggleCollapse} style={{ cursor: 'pointer' }}>
        {collapsed ? '▶' : '▼'} Schema:
      </span>
      {!collapsed && renderObject()}
    </div>
  );
};
