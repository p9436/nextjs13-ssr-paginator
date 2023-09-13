import './styles.css';
interface Props {
    path: string;
    currentPage: number;
    totalPages: number;
    maxVisiblePages?: number;
    buttonLabelPrevious?: string;
    buttonLabelNext?: string;
    styleClassWrapper?: string;
    styleClassGeneral?: string;
    styleClassLeft?: string;
    styleClassRight?: string;
    styleClassMiddle?: string;
    styleClassActive?: string;
    styleClassInactive?: string;
    styleClassDisabled?: string;
    params?: any;
}
export default function Paginator(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
