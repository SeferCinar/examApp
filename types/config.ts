export interface GradingScaleEntry {
  min: number
  max: number
  gpa?: number
}

export interface UniversityConfig {
  id: string
  university: {
    tr: string
    en?: string
    shortCode: string
  }
  department: {
    tr: string
    en?: string
  }
  gradingScale: Record<string, GradingScaleEntry>
  passingGrade: string
  conditionalPassingGrade?: string
  examWeights: {
    midterm: number
    final: number
  }
  courses?: Array<{
    code: string
    name: string
    credit?: number
    semester?: number
  }>
  metadata?: {
    contributedBy?: string
    lastUpdated?: string
    sourceUrl?: string | null
  }
}
