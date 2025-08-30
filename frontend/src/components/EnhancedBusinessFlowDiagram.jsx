import React from 'react';
import { useBusinessPlan } from '../context/BusinessPlanContext';

const EnhancedBusinessFlowDiagram = () => {
  const { state } = useBusinessPlan();

  // SVG dimensions and layout - vertically oriented as per the image
  const svgWidth = 1200;
  const svgHeight = 600;
  const nodeWidth = 140;
  const nodeHeight = 80;

  // Position calculations based on the flow diagram image
  const positions = {
    // Top level - AtaBridge (Danışmanlık & Tedarik Bulma)
    atabridge: { x: 50, y: 50 },
    
    // Second level - All suppliers in a horizontal row
    suppliers: state.suppliers.map((_, index) => ({
      x: 150 + (index * 180),
      y: 200
    })),
    
    // Third level - Ertuğ (Montaj & Üretim) - left side
    ertug: { x: 200, y: 350 },
    
    // Third level - Fiyuu (Satış & Swap Operasyonu) - right side  
    fiyuu: { x: 600, y: 350 },
    
    // Bottom level - Son Kullanıcı (Kurye)
    endUser: { x: 400, y: 500 }
  };

  // Helper function to create arrow paths
  const createArrowPath = (start, end, isDashed = false, label = '') => {
    const startX = start.x + nodeWidth / 2;
    const startY = start.y + nodeHeight;
    const endX = end.x + nodeWidth / 2;
    const endY = end.y;
    
    return (
      <g key={`${start.x}-${start.y}-${end.x}-${end.y}`}>
        <path
          d={`M ${startX} ${startY} L ${endX} ${endY}`}
          stroke={isDashed ? "#fb923c" : "#ea580c"}
          strokeWidth="2"
          fill="none"
          strokeDasharray={isDashed ? "8,4" : "none"}
          markerEnd="url(#arrowhead)"
        />
        {label && (
          <text
            x={(startX + endX) / 2}
            y={(startY + endY) / 2 - 10}
            textAnchor="middle"
            className="fill-gray-600 text-xs font-medium"
          >
            {label}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <svg width={svgWidth} height={svgHeight} className="border border-gray-200 rounded-lg bg-gradient-to-b from-orange-50 via-white to-amber-50">
          {/* Define arrow marker */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#ea580c" />
            </marker>
          </defs>

          {/* AtaBridge Node - Top */}
          <g>
            <rect
              x={positions.atabridge.x}
              y={positions.atabridge.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="12"
              fill="#fb923c"
              stroke="#ea580c"
              strokeWidth="2"
            />
            <text
              x={positions.atabridge.x + nodeWidth/2}
              y={positions.atabridge.y + nodeHeight/2 - 8}
              textAnchor="middle"
              className="fill-white text-sm font-bold"
            >
              AtaBridge
            </text>
            <text
              x={positions.atabridge.x + nodeWidth/2}
              y={positions.atabridge.y + nodeHeight/2 + 8}
              textAnchor="middle"
              className="fill-white text-xs"
            >
              Tedarik Araştırma & Danışmanlık
            </text>
            {/* Role label */}
            <text
              x={positions.atabridge.x - 10}
              y={positions.atabridge.y + nodeHeight/2}
              textAnchor="middle"
              className="fill-gray-500 text-xs font-medium"
              transform={`rotate(-90, ${positions.atabridge.x - 10}, ${positions.atabridge.y + nodeHeight/2})`}
            >
              Danışmanlık & Tedarik Bulma
            </text>
          </g>

          {/* Supplier Nodes - Second Level */}
          {state.suppliers.map((supplier, index) => {
            const pos = positions.suppliers[index];
            if (!pos) return null;
            
            return (
              <g key={supplier.id}>
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="8"
                  fill="#f8fafc"
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
                <text
                  x={pos.x + nodeWidth/2}
                  y={pos.y + nodeHeight/2 - 8}
                  textAnchor="middle"
                  className="fill-gray-800 text-sm font-semibold"
                >
                  {supplier.name}
                </text>
                <text
                  x={pos.x + nodeWidth/2}
                  y={pos.y + nodeHeight/2 + 8}
                  textAnchor="middle"
                  className="fill-gray-600 text-xs"
                >
                  {supplier.description}
                </text>
                {/* Tedarikçiler label */}
                {index === 0 && (
                  <text
                    x={pos.x - 10}
                    y={pos.y + nodeHeight/2}
                    textAnchor="middle"
                    className="fill-gray-500 text-xs font-medium"
                    transform={`rotate(-90, ${pos.x - 10}, ${pos.y + nodeHeight/2})`}
                  >
                    Tedarikçiler
                  </text>
                )}
              </g>
            );
          })}

          {/* Ertuğ Node - Third Level Left */}
          <g>
            <rect
              x={positions.ertug.x}
              y={positions.ertug.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="12"
              fill="#10b981"
              stroke="#047857"
              strokeWidth="2"
            />
            <text
              x={positions.ertug.x + nodeWidth/2}
              y={positions.ertug.y + nodeHeight/2 - 8}
              textAnchor="middle"
              className="fill-white text-sm font-bold"
            >
              Ertuğ
            </text>
            <text
              x={positions.ertug.x + nodeWidth/2}
              y={positions.ertug.y + nodeHeight/2 + 8}
              textAnchor="middle"
              className="fill-white text-xs"
            >
              Montaj & Üretim
            </text>
            {/* Role label */}
            <text
              x={positions.ertug.x - 10}
              y={positions.ertug.y + nodeHeight/2}
              textAnchor="middle"
              className="fill-gray-500 text-xs font-medium"
              transform={`rotate(-90, ${positions.ertug.x - 10}, ${positions.ertug.y + nodeHeight/2})`}
            >
              Montaj & Üretim
            </text>
          </g>

          {/* Fiyuu Node - Third Level Right */}
          <g>
            <rect
              x={positions.fiyuu.x}
              y={positions.fiyuu.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="12"
              fill="#3b82f6"
              stroke="#1d4ed8"
              strokeWidth="2"
            />
            <text
              x={positions.fiyuu.x + nodeWidth/2}
              y={positions.fiyuu.y + nodeHeight/2 - 8}
              textAnchor="middle"
              className="fill-white text-sm font-bold"
            >
              Fiyuu
            </text>
            <text
              x={positions.fiyuu.x + nodeWidth/2}
              y={positions.fiyuu.y + nodeHeight/2 + 8}
              textAnchor="middle"
              className="fill-white text-xs"
            >
              Satış & Swap Operasyonu
            </text>
            {/* Role label */}
            <text
              x={positions.fiyuu.x + nodeWidth + 20}
              y={positions.fiyuu.y + nodeHeight/2}
              textAnchor="middle"
              className="fill-gray-500 text-xs font-medium"
              transform={`rotate(-90, ${positions.fiyuu.x + nodeWidth + 20}, ${positions.fiyuu.y + nodeHeight/2})`}
            >
              Satış & Swap Operasyonu
            </text>
          </g>

          {/* End User Node - Bottom */}
          <g>
            <rect
              x={positions.endUser.x}
              y={positions.endUser.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="12"
              fill="#8b5cf6"
              stroke="#7c3aed"
              strokeWidth="2"
            />
            <text
              x={positions.endUser.x + nodeWidth/2}
              y={positions.endUser.y + nodeHeight/2 - 8}
              textAnchor="middle"
              className="fill-white text-sm font-bold"
            >
              Kurye
            </text>
            <text
              x={positions.endUser.x + nodeWidth/2}
              y={positions.endUser.y + nodeHeight/2 + 8}
              textAnchor="middle"
              className="fill-white text-xs"
            >
              Son Kullanıcı
            </text>
            {/* Role label */}
            <text
              x={positions.endUser.x - 10}
              y={positions.endUser.y + nodeHeight/2}
              textAnchor="middle"
              className="fill-gray-500 text-xs font-medium"
              transform={`rotate(-90, ${positions.endUser.x - 10}, ${positions.endUser.y + nodeHeight/2})`}
            >
              Son Kullanıcı
            </text>
          </g>

          {/* Arrows - AtaBridge to Suppliers (dashed - consultancy) */}
          {state.businessFlow.atabridgeConnections.map(supplierId => {
            const supplierIndex = state.suppliers.findIndex(s => s.id === supplierId);
            if (supplierIndex === -1) return null;
            const supplierPos = positions.suppliers[supplierIndex];
            if (!supplierPos) return null;
            
            return createArrowPath(
              positions.atabridge,
              supplierPos,
              true,
              'Bağlantı'
            );
          })}

          {/* Arrows - Suppliers to Ertug (solid - purchase) */}
          {state.businessFlow.supplierToErtug.map(supplierId => {
            const supplierIndex = state.suppliers.findIndex(s => s.id === supplierId);
            if (supplierIndex === -1) return null;
            const supplierPos = positions.suppliers[supplierIndex];
            if (!supplierPos) return null;
            
            return createArrowPath(
              supplierPos,
              positions.ertug,
              false,
              supplierIndex < 4 ? (supplierIndex === 0 ? 'Montaj Hattı' : 
                                 supplierIndex === 1 ? 'Boru Bükme Mak.' : 
                                 supplierIndex === 2 ? 'Lazer Kaynak Mak.' : 
                                 'CKD E-Moped Parçaları') : ''
            );
          })}

          {/* Arrows - Suppliers to Fiyuu (solid - purchase) */}
          {state.businessFlow.supplierToFiyuu.map(supplierId => {
            const supplierIndex = state.suppliers.findIndex(s => s.id === supplierId);
            if (supplierIndex === -1) return null;
            const supplierPos = positions.suppliers[supplierIndex];
            if (!supplierPos) return null;
            
            return createArrowPath(
              supplierPos,
              positions.fiyuu,
              false,
              'Batarya + Cabinet'
            );
          })}

          {/* Arrow - Ertug to Fiyuu */}
          {state.businessFlow.ertugToFiyuu && createArrowPath(
            positions.ertug,
            positions.fiyuu,
            false,
            'Tamamlanmış E-Moped Satışı'
          )}

          {/* Arrow - Fiyuu to End User */}
          {(state.businessFlow.fiyuuToEndUser.emoped || state.businessFlow.fiyuuToEndUser.battery) && 
            createArrowPath(
              positions.fiyuu,
              positions.endUser,
              false,
              'Swap E-Moped Satışı + Batarya'
            )
          }
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-8 bg-gray-50 p-4 rounded-lg">
        <div className="text-sm font-semibold text-gray-700 mb-2">Lejant:</div>
        <div className="flex items-center space-x-2">
          <svg width="30" height="2">
            <line x1="0" y1="1" x2="30" y2="1" stroke="#fb923c" strokeWidth="2" strokeDasharray="8,4" />
          </svg>
          <span className="text-xs text-gray-600">Bağlantı / Danışmanlık</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg width="30" height="2">
            <line x1="0" y1="1" x2="30" y2="1" stroke="#ea580c" strokeWidth="2" />
          </svg>
          <span className="text-xs text-gray-600">Satın Alma / Ürün Akışı</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBusinessFlowDiagram;