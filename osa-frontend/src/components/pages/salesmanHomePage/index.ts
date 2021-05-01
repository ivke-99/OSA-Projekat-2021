export interface ProductDTO {
    productName: string;
    description: string;
    price: number;
}

export interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
}

export interface ProductProps {
    product: ProductDTO;
}

export interface ProductInfoProps extends ProductProps {
    fetchCallback: () => void;
}
