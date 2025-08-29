from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid

# Business Plan Models
class Actor(BaseModel):
    name: str
    role: str

class ExecutiveSummary(BaseModel):
    projectName: str = Field(alias="project_name")
    actors: List[Actor]
    objective: str
    revenueModel: List[str] = Field(alias="revenue_model")

class Supplier(BaseModel):
    name: str
    product: str

class BusinessModel(BaseModel):
    suppliers: List[Supplier]

class Operations(BaseModel):
    atabridgeOps: List[str] = Field(alias="atabridge_ops")
    ertugOps: List[str] = Field(alias="ertug_ops") 
    fiyuuOps: List[str] = Field(alias="fiyuu_ops")

class Equipment(BaseModel):
    name: str
    supplier: str
    imageUploaded: bool = Field(default=False, alias="image_uploaded")
    imageId: Optional[str] = Field(default=None, alias="image_id")

class Specification(BaseModel):
    label: str
    value: str

class EMoped(BaseModel):
    model: str
    specs: List[Specification]
    imageUploaded: bool = Field(default=False, alias="image_uploaded")
    imageId: Optional[str] = Field(default=None, alias="image_id")

class Battery(BaseModel):
    features: List[str]
    imageUploaded: bool = Field(default=False, alias="image_uploaded")
    imageId: Optional[str] = Field(default=None, alias="image_id")

class Investment(BaseModel):
    item: str
    amount: str

class FinancialYear(BaseModel):
    year: str
    sales: int
    costs: int
    gross: int
    opex: int
    ebitda: int

class CompanyFinancials(BaseModel):
    financials: List[FinancialYear]

class AtabridgeFinancials(BaseModel):
    investment: str
    revenue: str
    model: str

class ErtugFinancials(BaseModel):
    investments: List[Investment]
    financials: List[FinancialYear]

class FinancialData(BaseModel):
    atabridge: AtabridgeFinancials
    ertug: ErtugFinancials
    fiyuuSales: CompanyFinancials = Field(alias="fiyuu_sales")
    fiyuuSwap: CompanyFinancials = Field(alias="fiyuu_swap")

class Products(BaseModel):
    equipment: List[Equipment]
    emoped: EMoped
    battery: Battery

class Risk(BaseModel):
    category: str
    risk: str

class InvestmentSummaryItem(BaseModel):
    actor: str
    investment: str
    model: str
    result: str

class BusinessPlanData(BaseModel):
    executiveSummary: ExecutiveSummary = Field(alias="executive_summary")
    businessModel: BusinessModel = Field(alias="business_model")
    operations: Operations
    products: Products
    financialData: FinancialData = Field(alias="financial_data")
    risks: List[Risk]
    investmentSummary: List[InvestmentSummaryItem] = Field(alias="investment_summary")

class BusinessPlan(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    content: BusinessPlanData
    createdAt: datetime = Field(default_factory=datetime.utcnow, alias="created_at")
    updatedAt: datetime = Field(default_factory=datetime.utcnow, alias="updated_at")

# Image Models
class ImageUpload(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: str  # "equipment", "emoped", "battery"
    itemId: Optional[str] = Field(default=None, alias="item_id")  # for equipment items
    filename: str
    originalName: str = Field(alias="original_name")
    mimetype: str
    size: int
    path: str
    uploadedAt: datetime = Field(default_factory=datetime.utcnow, alias="uploaded_at")

class ImageUploadResponse(BaseModel):
    success: bool
    imageUrl: str = Field(alias="image_url")
    imageId: str = Field(alias="image_id")

# Request/Response Models
class BusinessPlanResponse(BaseModel):
    success: bool
    data: BusinessPlanData

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    detail: Optional[str] = None