export interface Plugin {
    name: string
    id: string
    version: string
    author: string
    description: any 
    content: any
    type: String
    icon?: string
    url?: string
  }