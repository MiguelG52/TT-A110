'use client'
import { Button } from '@/components/ui/button'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useMemo } from 'react'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  showPageNumbers?: boolean
  showFirstLast?: boolean
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showPageNumbers = true,
  showFirstLast = true
}: PaginationControlsProps) => {
  // Memoizar los controles de paginación para evitar rerenders innecesarios
  const controls = useMemo(() => {
    if (totalPages <= 1) return null

    return (
      <div className={`flex justify-center items-center gap-2 ${className}`}>
        {showFirstLast && (
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            aria-label="Primera página"
          >
            <ChevronFirst className="h-4 w-4" />
          </Button>
        )}
        
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {showPageNumbers && (
          <span className="mx-2 text-sm">
            Página {currentPage} de {totalPages}
          </span>
        )}

        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {showFirstLast && (
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            aria-label="Última página"
          >
            <ChevronLast className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  }, [currentPage, totalPages, onPageChange, className, showPageNumbers, showFirstLast])

  return controls
}

export default PaginationControls