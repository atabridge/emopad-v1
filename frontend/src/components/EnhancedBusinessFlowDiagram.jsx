import React from 'react';
import { useBusinessPlan } from '../context/BusinessPlanContext';

const EnhancedBusinessFlowDiagram = () => {
  const { state } = useBusinessPlan();

  // SVG dimensions and layout - pyramid hierarchical structure
  const svgWidth = 1400;
  const svgHeight = 700;
  const nodeWidth = 140;
  const nodeHeight = 70;

  // Pyramid positioning - hierarchical from top to bottom
  const positions = {
    // Level 1 (Top) - AtaBridge centered
    atabridge: { x: 600, y: 50 },
    
    // Level 2 (Middle) - Suppliers distributed horizontally
    suppliers: state.suppliers.map((_, index) => {
      const totalSuppliers = state.suppliers.length;
      const startX = (svgWidth - (totalSuppliers * (nodeWidth + 40))) / 2;
      return {
        x: startX + (index * (nodeWidth + 40)),
        y: 200
      };
    }),
    
    // Level 3 (Lower) - Ertuğ and Fiyuu
    ertug: { x: 400, y: 350 },
    fiyuu: { x: 800, y: 350 },
    
    // Level 4 (Bottom) - End User centered
    endUser: { x: 600, y: 500 }
  };

  // Helper function to create arrow paths
  const createArrowPath = (start, end, isDashed = false, label = '', curveOffset = 0) => {
    const startX = start.x + nodeWidth / 2;
    const startY = start.y + nodeHeight;
    const endX = end.x + nodeWidth / 2;
    const endY = end.y;
    
    // Add curve for better visual flow
    const midY = (startY + endY) / 2 + curveOffset;
    
    return (
      <g key={`${start.x}-${start.y}-${end.x}-${end.y}-${Math.random()}`}>
        <path
          d={curveOffset !== 0 ? 
            `M ${startX} ${startY} Q ${startX + (endX - startX) / 2} ${midY} ${endX} ${endY}` :
            `M ${startX} ${startY} L ${endX} ${endY}`
          }
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
            className="fill-gray-600 text-xs font-medium bg-white"
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

          {/* Level Labels on the left */}
          <text
            x="20"
            y="90"
            className="fill-gray-500 text-sm font-semibold"
          >
            Danışmanlık & Tedarik Bulma
          </text>
          
          <text
            x="20"
            y="240"
            className="fill-gray-500 text-sm font-semibold"
          >
            Tedarikçiler
          </text>
          
          <text
            x="20"
            y="390"
            className="fill-gray-500 text-sm font-semibold"
          >
            Montaj & Üretim
          </text>
          
          <text
            x="20"
            y="540"
            className="fill-gray-500 text-sm font-semibold"
          >
            Son Kullanıcı
          </text>

          {/* Level 1: AtaBridge Node - Top Center */}
          <g>
            <rect
              x={positions.atabridge.x}
              y={positions.atabridge.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="12"
              fill="#fb923c"
              stroke="#ea580c"
              strokeWidth="3"
              filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
            />
            <text
              x={positions.atabridge.x + nodeWidth/2}
              y={positions.atabridge.y + nodeHeight/2 - 8}
              textAnchor="middle"
              className="fill-white text-base font-bold"
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
          </g>

          {/* Level 2: Supplier Nodes - Horizontal distribution */}
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
                  filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.1))"
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
                  {supplier.description.length > 20 ? 
                    supplier.description.substring(0, 20) + '...' : 
                    supplier.description}
                </text>
              </g>
            );
          })}

          {/* Level 3: Ertuğ Node - Lower Left */}
          <g>
            <rect
              x={positions.ertug.x}
              y={positions.ertug.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="12"
              fill="#10b981"
              stroke="#047857"
              strokeWidth="3"
              filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
            />
            <text
              x={positions.ertug.x + nodeWidth/2}
              y={positions.ertug.y + nodeHeight/2 - 8}
              textAnchor="middle"
              className="fill-white text-base font-bold"
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
          </g>

          {/* Level 3: Fiyuu Node - Lower Right */}
          <g>
            <rect
              x={positions.fiyuu.x}
              y={positions.fiyuu.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="12"
              fill="#3b82f6"
              stroke="#1d4ed8"
              strokeWidth="3"
              filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
            />
            <text
              x={positions.fiyuu.x + nodeWidth/2}
              y={positions.fiyuu.y + nodeHeight/2 - 8}
              textAnchor="middle"
              className="fill-white text-base font-bold"
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
          </g>

          {/* Level 4: End User Node - Bottom Center */}
          <g>
            <rect
              x={positions.endUser.x}
              y={positions.endUser.y}
              width={nodeWidth}
              height={nodeHeight}
              rx="12"
              fill="#8b5cf6"
              stroke="#7c3aed"
              strokeWidth="3"
              filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
            />
            <text
              x={positions.endUser.x + nodeWidth/2}
              y={positions.endUser.y + nodeHeight/2 - 8}
              textAnchor="middle"
              className="fill-white text-base font-bold"
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
          </g>

          {/* Arrows: AtaBridge to Suppliers (dashed - consultancy) */}
          {state.businessFlow.atabridgeConnections.map(supplierId => {
            const supplierIndex = state.suppliers.findIndex(s => s.id === supplierId);
            if (supplierIndex === -1) return null;
            const supplierPos = positions.suppliers[supplierIndex];
            if (!supplierPos) return null;
            
            return createArrowPath(
              positions.atabridge,
              supplierPos,
              true,
              'Bağlantı',
              20
            );
          })}

          {/* Arrows: Suppliers to Ertug (solid - purchase) */}
          {state.businessFlow.supplierToErtug.map(supplierId => {
            const supplierIndex = state.suppliers.findIndex(s => s.id === supplierId);
            if (supplierIndex === -1) return null;
            const supplierPos = positions.suppliers[supplierIndex];
            if (!supplierPos) return null;
            
            return createArrowPath(
              supplierPos,
              positions.ertug,
              false,
              '', // Etiket kaldırıldı
              -20
            );
          })}

          {/* Arrows: Suppliers to Fiyuu (solid - purchase) */}
          {state.businessFlow.supplierToFiyuu.map(supplierId => {
            const supplierIndex = state.suppliers.findIndex(s => s.id === supplierId);
            if (supplierIndex === -1) return null;
            const supplierPos = positions.suppliers[supplierIndex];
            if (!supplierPos) return null;
            
            return createArrowPath(
              supplierPos,
              positions.fiyuu,
              false,
              'Batarya + Cabinet',
              -20
            );
          })}

          {/* Arrow: Ertug to Fiyuu */}
          {state.businessFlow.ertugToFiyuu && createArrowPath(
            positions.ertug,
            positions.fiyuu,
            false,
            'Bataryasız E-Moped Satıyor',
            0
          )}

          {/* Arrows: Fiyuu to End User */}
          {(state.businessFlow.fiyuuToEndUser.emoped || state.businessFlow.fiyuuToEndUser.battery) && 
            createArrowPath(
              positions.fiyuu,
              positions.endUser,
              false,
              state.businessFlow.fiyuuToEndUser.emoped && state.businessFlow.fiyuuToEndUser.battery 
                ? "E-moped + Batarya Kiralama" 
                : state.businessFlow.fiyuuToEndUser.emoped 
                ? "E-moped Satışı" 
                : "Batarya Kiralama",
              20
            )
          }

          {/* Ertuğ to End User (if direct connection) */}
          {state.businessFlow.fiyuuToEndUser.emoped && createArrowPath(
            positions.ertug,
            positions.endUser,
            false,
            'E-moped Satışı',
            30
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div className="text-sm font-semibold text-gray-700 mb-3 text-center">Lejant</div>
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <svg width="40" height="2">
              <line x1="0" y1="1" x2="40" y2="1" stroke="#fb923c" strokeWidth="2" strokeDasharray="8,4" />
            </svg>
            <span className="text-xs text-gray-600">Bağlantı / Danışmanlık</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg width="40" height="2">
              <line x1="0" y1="1" x2="40" y2="1" stroke="#ea580c" strokeWidth="2" />
              <polygon points="37,0 40,1 37,2" fill="#ea580c" />
            </svg>
            <span className="text-xs text-gray-600">Satın Alma / Ürün Akışı</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBusinessFlowDiagram;