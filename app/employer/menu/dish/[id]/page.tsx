import { DishDetail } from "@/components/menu/employer/dish-detail"

interface DishDetailPageProps {
  params: {
    id: string
  }
}

export default function DishDetailPage({ params }: DishDetailPageProps) {
  return <DishDetail dishId={params.id} />
}
