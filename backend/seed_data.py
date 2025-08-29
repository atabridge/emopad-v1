# Seed data for the business plan - converted from mock.js
from datetime import datetime

SEED_BUSINESS_PLAN = {
    "id": "default-business-plan-001",
    "content": {
        "executive_summary": {
            "project_name": "E-Moped Üretimi & Batarya Dolum Servisi",
            "actors": [
                {"name": "AtaBridge", "role": "Tedarik & Danışmanlık"},
                {"name": "Ertuğ", "role": "Montaj & Üretim"},
                {"name": "Fiyuu", "role": "Satış & Swap Operasyonu"}
            ],
            "objective": "Türkiye'de hızla büyüyen e-mobilite pazarında elektrikli moped üretimi ve batarya swap altyapısını entegre ederek, ölçeklenebilir ve sürdürülebilir bir ekosistem kurmak.",
            "revenue_model": [
                "AtaBridge → Tedarikçi bulma, satışlardan %3 komisyon",
                "Ertuğ → E-moped üretimi ve satış gelirleri",
                "Fiyuu → E-moped satışı + swap istasyonu abonelik gelirleri"
            ]
        },
        "business_model": {
            "suppliers": [
                {"name": "Jinggong", "product": "Montaj hattı üretimi"},
                {"name": "Sanco", "product": "Boru bükme makinası üreticisi"},
                {"name": "Lingping", "product": "Lazer kaynak makina üreticisi"},
                {"name": "Sleeu", "product": "CKD E-moped parça tedarikçisi"},
                {"name": "Zhizhu", "product": "Batarya ve cabinet üreticisi"}
            ]
        },
        "operations": {
            "atabridge_ops": [
                "Çin'de tedarikçi araştırması",
                "Tedarikçi sözleşmeleri ve fiyat pazarlıkları",
                "İhracat ve lojistik sürecinde koordinasyon",
                "Gelir: Satışlardan %3 komisyon"
            ],
            "ertug_ops": [
                "İstanbul'da TSE & ISO belgelerinin alınması",
                "Montaj hattı kurulumu (18 m, 12–15 adet/gün kapasite)",
                "Makina temini ve kurulum",
                "CKD parçalarının ithalatı ve yerel parça temini",
                "Motor montajının tamamlanması"
            ],
            "fiyuu_ops": [
                "Batarya ve swap kabini ithalatı",
                "Swap istasyonlarının kurulumu",
                "Kuryelere motor satışı (1 yıllık kontrat)",
                "Batarya dolum abonelik hizmeti"
            ]
        },
        "products": {
            "equipment": [
                {"name": "Montaj Hattı", "supplier": "Jinggong", "image_uploaded": False, "image_id": None},
                {"name": "Boru Bükme Makinası", "supplier": "Sanco", "image_uploaded": False, "image_id": None},
                {"name": "Lazer Kaynak Makinası", "supplier": "Lingping", "image_uploaded": False, "image_id": None}
            ],
            "emoped": {
                "model": "BODYGUARD",
                "specs": [
                    {"label": "Motor Gücü", "value": "3.000W (Xinwei / QS)"},
                    {"label": "Azami Hız", "value": "80 km/s"},
                    {"label": "Menzil", "value": "60–80 km"},
                    {"label": "Batarya", "value": "72V 30–40Ah LFP"},
                    {"label": "Lastik", "value": "12 inç, disk fren CBS sistemi"},
                    {"label": "Boyut", "value": "1900×800×1200 mm"},
                    {"label": "Sertifika", "value": "EEC sertifikalı"}
                ],
                "image_uploaded": False,
                "image_id": None
            },
            "battery": {
                "features": [
                    "IP67 su/toz dayanıklılığı",
                    "Akıllı BMS sistemi",
                    "8–10 slot swap kabinleri",
                    "Akıllı sıcaklık yönetimi & yangın söndürücü",
                    "Uzaktan izleme & OTA güncellemeleri"
                ],
                "image_uploaded": False,
                "image_id": None
            }
        },
        "financial_data": {
            "atabridge": {
                "investment": "Düşük sermaye (ofis giderleri, insan kaynağı)",
                "revenue": "İlk yıl ~300K TL",
                "model": "Satışlardan %3 komisyon"
            },
            "ertug": {
                "investments": [
                    {"item": "Montaj hattı", "amount": "100.000 USD"},
                    {"item": "Boru bükme makinası", "amount": "25.000 USD"},
                    {"item": "Lazer kaynak makinası", "amount": "35.000 USD"},
                    {"item": "CKD ithalat & stoklama", "amount": "1.200.000 USD"},
                    {"item": "Nakliye & gümrükleme", "amount": "10.000 USD"}
                ],
                "financials": [
                    {"year": "2026", "sales": 107949600, "costs": 95891511, "gross": 12058089, "opex": 18720333, "ebitda": -6662245},
                    {"year": "2027", "sales": 213550400, "costs": 176597577, "gross": 36952823, "opex": 27934550, "ebitda": 9018273},
                    {"year": "2028", "sales": 353410000, "costs": 283394827, "gross": 70015173, "opex": 32015104, "ebitda": 38000069}
                ]
            },
            "fiyuu_sales": {
                "financials": [
                    {"year": "2026", "sales": 143595000, "costs": 118440000, "gross": 25155000, "opex": 14151352, "ebitda": 11003648},
                    {"year": "2027", "sales": 298530000, "costs": 221520000, "gross": 77010000, "opex": 21224257, "ebitda": 55785743},
                    {"year": "2028", "sales": 516853125, "costs": 365400000, "gross": 151453125, "opex": 28734657, "ebitda": 122718468}
                ]
            },
            "fiyuu_swap": {
                "financials": [
                    {"year": "2026", "sales": 108889200, "costs": 19963020, "gross": 88926180, "opex": 56831112, "ebitda": 56431042},
                    {"year": "2027", "sales": 469476000, "costs": 74844000, "gross": 394632000, "opex": 172439965, "ebitda": 311575485},
                    {"year": "2028", "sales": 1119787200, "costs": 159390000, "gross": 960397200, "opex": 377590438, "ebitda": 804928956}
                ]
            }
        },
        "risks": [
            {"category": "AtaBridge", "risk": "Tedarikçi güvenilirliği, fiyat dalgalanmaları"},
            {"category": "Ertuğ", "risk": "TSE/ISO belgelerinin alınamaması, EEC sertifikasyon riski"},
            {"category": "Fiyuu", "risk": "Batarya ithalat izinlerinin alınmaması, swap altyapısı bakım maliyetleri"},
            {"category": "Genel", "risk": "Döviz kuru dalgalanmaları, lojistik sorunları, batarya güvenliği riskleri"}
        ],
        "investment_summary": [
            {
                "actor": "AtaBridge",
                "investment": "Ofis giderleri & operasyon (düşük yatırım)",
                "model": "Tedarikçi bulma, satışlardan %3 komisyon",
                "result": "İlk yıl ~300K TL komisyon, ölçek büyüdükçe artan sabit gelir"
            },
            {
                "actor": "Ertuğ",
                "investment": "Montaj hattı (100K USD), Boru bükme (25K USD), Lazer kaynak (35K USD), CKD ithalat (1.2M USD), Nakliye & gümrük (10K USD)",
                "model": "E-moped montajı → yalnızca Fiyuu'ya satış",
                "result": "2026: 3,500 adet → Net Sales 108M TL, 2028: 9,000 adet → Net Sales 353M TL, EBITDA: -6.6M TL → 38M TL"
            },
            {
                "actor": "Fiyuu – Sales",
                "investment": "Satış & pazarlama altyapısı (~30M TL)",
                "model": "Kuryelere e-moped satışı",
                "result": "2026: Net Sales 144M TL, 2028: Net Sales 517M TL, EBITDA: 11M TL → 123M TL"
            },
            {
                "actor": "Fiyuu – Battery Rental",
                "investment": "Batarya & cabinet (~95M TL), swap altyapı & yazılım giderleri",
                "model": "Kuryelere batarya kiralama (3.600 TL/ay, sınırsız dolum)",
                "result": "2026: Net Sales 109M TL, 2028: Net Sales 1.12B TL, EBITDA: 56M TL → 805M TL"
            }
        ]
    },
    "created_at": datetime.utcnow(),
    "updated_at": datetime.utcnow(),
    "active": True
}