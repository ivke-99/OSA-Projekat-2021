export interface ProductDTO {
    productName: string;
    description: string;
    price: number;
}

export interface OrderDTO {
    isAnonComment: boolean;
    timeOfOrder: Date;
    comment: string;
}

export interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
}

export interface ProductProps {
    product: ProductDTO;
}

export interface OrderInfoProps {
    order: OrderDTO;
}

export interface ProductInfoProps extends ProductProps {
    fetchCallback: () => void;
}
