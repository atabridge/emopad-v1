import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state with all data structures
const initialState = {
  // Aktörler
  actors: [
    {
      id: 'atabridge',
      name: 'AtaBridge',
      logoUrl: '',
      description: 'Tedarik & Danışmanlık'
    },
    {
      id: 'ertug',
      name: 'Ertuğ',
      logoUrl: '',
      description: 'Montaj & Üretim'
    },
    {
      id: 'fiyuu',
      name: 'Fiyuu',
      logoUrl: '',
      description: 'Satış & Swap Operasyonu'
    }
  ],

  // Tedarikçiler
  suppliers: [
    { id: '1', name: 'Jinggong', logoUrl: '', description: 'Montaj hattı üretimi' },
    { id: '2', name: 'Sanco', logoUrl: '', description: 'Boru bükme makinası üreticisi' },
    { id: '3', name: 'Lingping', logoUrl: '', description: 'Lazer kaynak makina üreticisi' },
    { id: '4', name: 'Sleeu', logoUrl: '', description: 'CKD E-moped parça tedarikçisi' },
    { id: '5', name: 'Zhizhu', logoUrl: '', description: 'Batarya ve cabinet üreticisi' }
  ],

  // Ürünler
  products: {
    equipments: [
      { 
        id: '1', 
        category: 'A', 
        name: 'Montaj Hattı', 
        imageUrl: '', 
        specifications: 'Kapasité: 18m, 12-15 adet/gün', 
        supplier: 'Jinggong',
        price: '100,000 USD'
      },
      { 
        id: '2', 
        category: 'A', 
        name: 'Boru Bükme Makinası', 
        imageUrl: '', 
        specifications: 'Otomatik boru bükme sistemi', 
        supplier: 'Sanco',
        price: '25,000 USD'
      },
      { 
        id: '3', 
        category: 'A', 
        name: 'Lazer Kaynak Makinası', 
        imageUrl: '', 
        specifications: 'Yüksek hassasiyet lazer kaynak', 
        supplier: 'Lingping',
        price: '35,000 USD'
      }
    ],
    emopeds: [
      {
        id: '1',
        category: 'B',
        name: 'E-Moped BODYGUARD 3000W',
        imageUrl: '',
        specifications: 'Motor: 3000W, Hız: 80km/h, Menzil: 60-80km, Batarya: 72V 30-40Ah LFP',
        supplier: 'Sleeu',
        price: '305 USD FOB',
        customsData: {
          brand: 'Sleeu',
          hsCode: '8714.10.00.90',
          model: '3000W',
          fobUsd: 305,
          qty: 270,
          freight: 15,
          cifUsd: 320,
          cifTl: 14392,
          gv: 532,
          ilaveGv: 720,
          kkdf: 0,
          dv: 3,
          dep: 56,
          tah: 3,
          tumSair: 4,
          logis: 130,
          cogs: 15839,
          bandrol: 0,
          araTop: 15839,
          otv: 0,
          finalTl: 15839,
          finalUsd: 352
        }
      }
    ],
    batteries: [
      {
        id: '1',
        category: 'C',
        name: 'Battery 72V 40Ah LFP',
        imageUrl: '',
        specifications: 'IP67 dayanıklılık, Akıllı BMS sistemi, Uzaktan izleme',
        supplier: 'Zhizhu',
        price: '289 USD FOB',
        customsData: {
          brand: 'Zhizhu',
          hsCode: '8507.60.00.00.01',
          model: '72V30A',
          fobUsd: 289,
          qty: 1260,
          freight: 3.2,
          cifUsd: 292,
          cifTl: 13148,
          gv: 355,
          ilaveGv: 3944,
          kkdf: 0,
          dv: 1,
          dep: 12,
          tah: 1,
          tumSair: 1,
          logis: 28,
          cogs: 17489,
          bandrol: 0,
          araTop: 17489,
          otv: 525,
          finalTl: 18014,
          finalUsd: 400
        }
      }
    ],
    cabinets: [
      {
        id: '1',
        category: 'D',
        name: 'Cabinet 10 Slot',
        imageUrl: '',
        specifications: '8-10 slot swap kabinleri, Akıllı sıcaklık yönetimi, Yangın söndürücü',
        supplier: 'Zhizhu',
        price: '1,672 USD FOB',
        customsData: {
          brand: 'Zhizhu',
          hsCode: '8504.40.95.90.12',
          model: 'xxx',
          fobUsd: 1672,
          qty: 56,
          freight: 71,
          cifUsd: 1743,
          cifTl: 78454,
          gv: 2589,
          ilaveGv: 3923,
          kkdf: 0,
          dv: 16,
          dep: 268,
          tah: 14,
          tumSair: 18,
          logis: 625,
          cogs: 85907,
          bandrol: 0,
          araTop: 85907,
          otv: 0,
          finalTl: 85907,
          finalUsd: 1909
        }
      }
    ]
  },

  // İş Planı Diyagramı İlişkileri
  businessFlow: {
    atabridgeConnections: ['1', '2', '3', '4', '5'], // supplier IDs
    supplierToErtug: ['1', '2', '3', '4'], // supplier IDs that sell to Ertug
    supplierToFiyuu: ['5'], // supplier IDs that sell to Fiyuu
    ertugToFiyuu: true, // Fiyuu buys E-moped from Ertug
    fiyuuToEndUser: {
      emoped: true,
      battery: true
    }
  },

  // Finansal Veriler
  financials: {
    ertug: {
      investments: [
        { name: 'Montaj Hattı', amount: 100000 },
        { name: 'Boru Bükme Makinası', amount: 25000 },
        { name: 'Lazer Kaynak Makinası', amount: 35000 },
        { name: 'CKD İthalat & Stoklama', amount: 1200000 },
        { name: 'Nakliye & Gümrükleme', amount: 10000 }
      ],
      revenueModel: 'E-moped üretimi ve Fiyuu\'ya satışı',
      production: {
        2026: { units: 3500, cost: 27398, price: 33840 },
        2027: { units: 6000, cost: 29433, price: 36920 },
        2028: { units: 9000, cost: 31488, price: 40600 }
      },
      pnl: {
        2026: { netSales: 107949600, costOfSales: 95891511, grossProfit: 12058089, totalOpex: 18720333, ebitda: -6662245 },
        2027: { netSales: 213550400, costOfSales: 176597577, grossProfit: 36952823, totalOpex: 27934550, ebitda: 9018273 },
        2028: { netSales: 353410000, costOfSales: 283394827, grossProfit: 70015173, totalOpex: 32015104, ebitda: 38000069 }
      }
    },
    fiyuuSales: {
      investments: [
        { name: 'Satış & Pazarlama Altyapısı', amount: 30000000 }
      ],
      revenueModel: 'E-moped Al-Sat ve Esnaf kurye satışı',
      sales: {
        2026: { units: 3500, buyPrice: 33840, sellPrice: 45000 },
        2027: { units: 6000, buyPrice: 36920, sellPrice: 51750 },
        2028: { units: 9000, buyPrice: 40600, sellPrice: 59513 }
      },
      pnl: {
        2026: { netSales: 143595000, costOfSales: 118440000, grossProfit: 25155000, totalOpex: 14151352, ebitda: 11003648 },
        2027: { netSales: 298530000, costOfSales: 221520000, grossProfit: 77010000, totalOpex: 21224257, ebitda: 55785743 },
        2028: { netSales: 516853125, costOfSales: 365400000, grossProfit: 151453125, totalOpex: 28734657, ebitda: 122718468 }
      }
    },
    fiyuuSwap: {
      investments: [
        { name: 'Batarya & Cabinet', amount: 95000000 },
        { name: 'Swap Altyapı & Yazılım', amount: 15000000 }
      ],
      revenueModel: 'Esnaf kuryeye batarya dolumu kiralama',
      rental: {
        2026: { batteryCount: 2520, cabinetCount: 140, monthlyRental: 3600 },
        2027: { batteryCount: 10080, cabinetCount: 560, monthlyRental: 3800 },
        2028: { batteryCount: 22680, cabinetCount: 1260, monthlyRental: 4000 }
      },
      pnl: {
        2026: { netSales: 108889200, costOfSales: 19963020, grossProfit: 88926180, totalOpex: 56831112, ebitda: 56431042 },
        2027: { netSales: 469476000, costOfSales: 74844000, grossProfit: 394632000, totalOpex: 172439965, ebitda: 311575485 },
        2028: { netSales: 1119787200, costOfSales: 159390000, grossProfit: 960397200, totalOpex: 377590438, ebitda: 804928956 }
      }
    }
  }
};

// Action types
const actionTypes = {
  UPDATE_ACTOR: 'UPDATE_ACTOR',
  ADD_SUPPLIER: 'ADD_SUPPLIER',
  UPDATE_SUPPLIER: 'UPDATE_SUPPLIER',
  DELETE_SUPPLIER: 'DELETE_SUPPLIER',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  UPDATE_BUSINESS_FLOW: 'UPDATE_BUSINESS_FLOW',
  UPDATE_FINANCIAL: 'UPDATE_FINANCIAL',
  LOAD_DATA: 'LOAD_DATA'
};

// Reducer
function businessPlanReducer(state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_ACTOR:
      return {
        ...state,
        actors: state.actors.map(actor =>
          actor.id === action.payload.id ? { ...actor, ...action.payload } : actor
        )
      };
    
    case actionTypes.ADD_SUPPLIER:
      return {
        ...state,
        suppliers: [...state.suppliers, { ...action.payload, id: Date.now().toString() }]
      };
    
    case actionTypes.UPDATE_SUPPLIER:
      return {
        ...state,
        suppliers: state.suppliers.map(supplier =>
          supplier.id === action.payload.id ? { ...supplier, ...action.payload } : supplier
        )
      };
    
    case actionTypes.DELETE_SUPPLIER:
      return {
        ...state,
        suppliers: state.suppliers.filter(supplier => supplier.id !== action.payload.id)
      };
    
    case actionTypes.UPDATE_BUSINESS_FLOW:
      return {
        ...state,
        businessFlow: { ...state.businessFlow, ...action.payload }
      };
    
    case actionTypes.UPDATE_FINANCIAL:
      return {
        ...state,
        financials: { ...state.financials, ...action.payload }
      };
    
    case actionTypes.LOAD_DATA:
      return action.payload;
    
    default:
      return state;
  }
}

// Context
const BusinessPlanContext = createContext();

// Provider
export function BusinessPlanProvider({ children }) {
  const [state, dispatch] = useReducer(businessPlanReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('businessPlanData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: actionTypes.LOAD_DATA, payload: parsedData });
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('businessPlanData', JSON.stringify(state));
  }, [state]);

  return (
    <BusinessPlanContext.Provider value={{ state, dispatch, actionTypes }}>
      {children}
    </BusinessPlanContext.Provider>
  );
}

// Hook
export function useBusinessPlan() {
  const context = useContext(BusinessPlanContext);
  if (!context) {
    throw new Error('useBusinessPlan must be used within a BusinessPlanProvider');
  }
  return context;
}