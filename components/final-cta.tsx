"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showResumeModal, setShowResumeModal] = useState(false)

  const handlePreviewResume = () => {
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 'ontouchstart' in window;

    if (isMobile) {
      // Open modal for mobile
      setShowResumeModal(true)
      // Add security measures when modal opens
      document.body.style.overflow = 'hidden'
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
        ; (document.body.style as any).msUserSelect = 'none'
    } else {
      // Open in new tab for web with enhanced security
      const newWindow = window.open('/Resume/CURRICULUM VITAE.pdf#toolbar=0&navpanes=0&scrollbar=1&statusbar=0&messages=0&zoom=auto', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes')

      if (newWindow) {
        // Add comprehensive security to the new window
        newWindow.addEventListener('load', () => {
          try {
            // Prevent all context menu operations
            newWindow.document.addEventListener('contextmenu', (e) => e.preventDefault())

            // Block all keyboard shortcuts for download/print
            newWindow.document.addEventListener('keydown', (e) => {
              // Block print shortcuts
              if (e.key === 'PrintScreen' ||
                (e.ctrlKey && e.shiftKey && e.key === 'S') ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.key === 'p') ||
                (e.ctrlKey && e.key === 'P') ||
                (e.ctrlKey && e.key === 's') ||
                (e.ctrlKey && e.key === 'S') ||
                (e.metaKey && e.key === 'p') || // Mac Cmd+P
                (e.metaKey && e.key === 's') || // Mac Cmd+S
                (e.altKey && e.key === 'PrintScreen') || // Alt+PrintScreen
                (e.key === 'F12') || // F12 (dev tools)
                (e.ctrlKey && e.shiftKey && e.key === 'C') || // Ctrl+Shift+C (inspect)
                (e.metaKey && e.shiftKey && e.key === 'C')) { // Mac Cmd+Shift+C
                e.preventDefault()
                e.stopPropagation()
                return false
              }
            })

            // Block all copy/paste operations
            newWindow.document.addEventListener('copy', (e) => e.preventDefault())
            newWindow.document.addEventListener('cut', (e) => e.preventDefault())
            newWindow.document.addEventListener('paste', (e) => e.preventDefault())
            newWindow.document.addEventListener('selectstart', (e) => e.preventDefault())
            newWindow.document.addEventListener('dragstart', (e) => e.preventDefault())
            newWindow.document.addEventListener('drop', (e) => e.preventDefault())

            // Block print events
            newWindow.addEventListener('beforeprint', (e) => e.preventDefault())
            newWindow.addEventListener('afterprint', (e) => e.preventDefault())

            // Add comprehensive CSS to prevent all download/print methods
            const style = newWindow.document.createElement('style')
            style.textContent = `
              * {
                user-select: none !important;
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                -webkit-touch-callout: none !important;
                -webkit-user-drag: none !important;
                -khtml-user-drag: none !important;
                -moz-user-drag: none !important;
                -o-user-drag: none !important;
              }
              body {
                user-select: text !important;
                -webkit-user-select: text !important;
              }
              @media print {
                * {
                  display: none !important;
                }
                body {
                  display: none !important;
                }
              }
              @page {
                margin: 0 !important;
                size: 0 !important;
              }
              /* Hide download and print buttons in PDF viewers */
              .pdfViewer .download,
              .pdfViewer .print,
              .pdfViewer .secondaryToolbar,
              .toolbarButton.download,
              .toolbarButton.print,
              .download-button,
              .print-button,
              #download,
              #print,
              [data-testid="download-button"],
              [data-testid="print-button"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
              }
              /* Hide the entire toolbar if possible, or specific icons */
              .pdfViewer .toolbar,
              #toolbarContainer,
              .viewerToolbar,
              .secondaryToolbarButtonContainer {
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                overflow: hidden !important;
              }
              /* Attempt to hide specific icons more broadly */
              .icon-toolbar-download,
              .icon-toolbar-print,
              .menuitem.download,
              .menuitem.print {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
              }
              /* Hide common PDF viewer controls */
              .toolbar,
              .toolbarContainer,
              .viewerToolbar,
              .findbar,
              .secondaryToolbar {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                overflow: hidden !important;
              }
              /* Hide any element with download or print in class/id */
              [class*="download"],
              [class*="print"],
              [id*="download"],
              [id*="print"],
              [aria-label*="download"],
              [aria-label*="print"],
              [title*="download"],
              [title*="print"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
              }
              /* Unavailable cursor to prevent copying */
              body, html, * {
                cursor: not-allowed !important;
              }
              iframe {
                cursor: not-allowed !important;
              }
              iframe * {
                cursor: not-allowed !important;
              }
            `
            newWindow.document.head.appendChild(style)

            // Override window methods to prevent download/print
            const originalPrint = newWindow.print
            const originalOpen = newWindow.open
            const originalSaveAs = (newWindow as any).saveAs
            const originalExecCommand = newWindow.document.execCommand
            const originalQueryCommandSupported = newWindow.document.queryCommandSupported

            newWindow.print = () => false
            newWindow.open = () => null
              ; (newWindow as any).saveAs = () => false
            newWindow.document.execCommand = () => false
            newWindow.document.queryCommandSupported = () => false

            // Prevent right-click on iframe if it exists
            const iframes = newWindow.document.getElementsByTagName('iframe')
            for (let iframe of iframes) {
              iframe.addEventListener('contextmenu', (e) => e.preventDefault())
              iframe.addEventListener('load', () => {
                try {
                  iframe.contentWindow?.document.addEventListener('contextmenu', (e) => e.preventDefault())
                } catch (e) {
                  // Cross-origin iframe, can't access
                }
              })
            }

          } catch (error) {
            console.log('Cannot fully secure new window due to cross-origin restrictions')
          }
        })
      }
    }
  }

  const handleCloseModal = () => {
    setShowResumeModal(false)
    // Restore body styles when modal closes
    document.body.style.overflow = ''
    document.body.style.userSelect = ''
    document.body.style.webkitUserSelect = ''
      ; (document.body.style as any).msUserSelect = ''
  }

  // Prevent right-click globally when modal is open
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (showResumeModal) {
        e.preventDefault()
        return false
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (showResumeModal) {
        // Prevent all download/print/screenshot shortcuts
        if (e.key === 'PrintScreen' ||
          (e.ctrlKey && e.shiftKey && e.key === 'S') || // Ctrl+Shift+S (Chrome)
          (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl+Shift+I (DevTools)
          (e.ctrlKey && e.key === 'p') || // Ctrl+P (Print)
          (e.ctrlKey && e.key === 'P') ||
          (e.ctrlKey && e.key === 's') || // Ctrl+S (Save)
          (e.ctrlKey && e.key === 'S') ||
          (e.metaKey && e.key === 'p') || // Mac Cmd+P
          (e.metaKey && e.key === 's') || // Mac Cmd+S
          (e.altKey && e.key === 'PrintScreen') || // Alt+PrintScreen
          (e.key === 'F12') || // F12 (dev tools)
          (e.ctrlKey && e.shiftKey && e.key === 'C') || // Ctrl+Shift+C (inspect)
          (e.metaKey && e.shiftKey && e.key === 'C')) { // Mac Cmd+Shift+C
          e.preventDefault()
          e.stopPropagation()
          return false
        }
      }
    }

    const handleCopy = (e: ClipboardEvent) => {
      if (showResumeModal) {
        e.preventDefault()
        return false
      }
    }

    const handlePaste = (e: ClipboardEvent) => {
      if (showResumeModal) {
        e.preventDefault()
        return false
      }
    }

    const handleSelectStart = (e: Event) => {
      if (showResumeModal) {
        e.preventDefault()
        return false
      }
    }

    const handleDragStart = (e: DragEvent) => {
      if (showResumeModal) {
        e.preventDefault()
        return false
      }
    }

    const handleDrop = (e: DragEvent) => {
      if (showResumeModal) {
        e.preventDefault()
        return false
      }
    }

    const handlePrint = (e: Event) => {
      if (showResumeModal) {
        e.preventDefault()
        return false
      }
    }

    if (showResumeModal) {
      document.addEventListener('contextmenu', handleContextMenu)
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('copy', handleCopy)
      document.addEventListener('cut', handleCopy)
      document.addEventListener('paste', handlePaste)
      document.addEventListener('selectstart', handleSelectStart)
      document.addEventListener('dragstart', handleDragStart)
      document.addEventListener('drop', handleDrop)
      document.addEventListener('beforeprint', handlePrint)
      document.addEventListener('afterprint', handlePrint)

      // Override global methods
      const originalPrint = window.print
      const originalOpen = window.open
      window.print = () => false
      window.open = () => null

      // Restore original methods when modal closes
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu)
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('copy', handleCopy)
        document.removeEventListener('cut', handleCopy)
        document.removeEventListener('paste', handlePaste)
        document.removeEventListener('selectstart', handleSelectStart)
        document.removeEventListener('dragstart', handleDragStart)
        document.removeEventListener('drop', handleDrop)
        document.removeEventListener('beforeprint', handlePrint)
        document.removeEventListener('afterprint', handlePrint)
        window.print = originalPrint
        window.open = originalOpen
      }
    }
  }, [showResumeModal])

  return (
    <section id="contact" className="py-24 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-cal-sans)" }}
        >
          Let's build something amazing together
        </h2>
        <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Have a project in mind? I'm always excited to work on innovative ideas and help bring them to life.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/255760381510"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              size="lg"
              className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-full px-8 h-14 text-base font-medium shadow-lg shadow-white/20"
            >
              Start a Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          {/* <Button
            variant="outline"
            size="lg"
            onClick={handlePreviewResume}
            className="rounded-full px-8 h-14 text-base font-medium border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 bg-transparent"
          >
            Preview Resume
          </Button> */}
        </div>

        <p className="mt-8 text-sm text-zinc-500">Available for freelance projects and full-time opportunities.</p>
      </motion.div>

      {/* Resume Preview Modal */}
      {showResumeModal && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] flex items-center justify-center p-2 sm:p-4"
          onContextMenu={(e) => e.preventDefault()}
          onSelect={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          <div className="bg-zinc-900 rounded-xl w-full h-full sm:h-auto sm:w-[95vw] sm:max-w-7xl sm:max-h-[92vh] flex flex-col border border-zinc-800 shadow-2xl cursor-not-allowed">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                <h3 className="text-white font-semibold text-lg sm:text-xl">Resume Preview</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseModal}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all hover:scale-110"
                aria-label="Close resume preview"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Resume Content with Enhanced Protection - Classic Dialog Style */}
            <div className="flex-1 overflow-hidden relative bg-white sm:m-4 sm:rounded-lg sm:border sm:border-zinc-200">
              <style jsx global>{`
                .resume-container {
                  user-select: none !important;
                  -webkit-user-select: none !important;
                  -moz-user-select: none !important;
                  -ms-user-select: none !important;
                  -webkit-touch-callout: none !important;
                  pointer-events: none !important;
                  -webkit-pointer-events: none !important;
                  -moz-pointer-events: none !important;
                }
                .resume-container iframe {
                  pointer-events: auto !important;
                  user-select: text !important;
                  -webkit-user-select: text !important;
                }
                .protection-overlay {
                  position: absolute !important;
                  top: 0 !important;
                  left: 0 !important;
                  right: 0 !important;
                  bottom: 0 !important;
                  pointer-events: none !important;
                  z-index: 100 !important;
                  background: transparent !important;
                }
                /* Mobile screenshot protection */
                @media (pointer: coarse) {
                  .protection-overlay::before {
                    content: '' !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    background: rgba(0,0,0,0.01) !important;
                    pointer-events: none !important;
                    z-index: 100 !important;
                  }
                  .resume-container {
                    margin: 0 !important;
                    border-radius: 0 !important;
                    border: none !important;
                  }
                }
                /* Classic dialog styling for web */
                @media (pointer: fine) {
                  .resume-container iframe {
                    border-radius: 0.5rem !important;
                  }
                }
                /* Prevent text selection globally */
                body.no-select * {
                  user-select: none !important;
                  -webkit-user-select: none !important;
                  -moz-user-select: none !important;
                  -ms-user-select: none !important;
                }
                /* Unavailable cursor for mobile modal */
                .resume-container,
                .resume-container *,
                iframe,
                iframe * {
                  cursor: not-allowed !important;
                }
              `}</style>

              <div className="resume-container h-full w-full relative">
                <iframe
                  src="/Resume/CURRICULUM VITAE.pdf#toolbar=0&navpanes=0&scrollbar=1&statusbar=0&messages=0&zoom=auto"
                  className="w-full h-full border-0 sm:rounded-lg"
                  title="Resume Preview"
                  onContextMenu={(e) => e.preventDefault()}
                  onSelect={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  onLoad={(e) => {
                    const iframe = e.target as HTMLIFrameElement;
                    if (iframe.contentWindow) {
                      try {
                        // Enhanced security for iframe
                        iframe.contentWindow.document.addEventListener('contextmenu', (e) => e.preventDefault());
                        iframe.contentWindow.document.addEventListener('selectstart', (e) => e.preventDefault());
                        iframe.contentWindow.document.addEventListener('dragstart', (e) => e.preventDefault());
                        iframe.contentWindow.document.addEventListener('copy', (e) => e.preventDefault());
                        iframe.contentWindow.document.addEventListener('cut', (e) => e.preventDefault());
                        iframe.contentWindow.document.addEventListener('beforeprint', (e) => e.preventDefault());

                        // Add CSS to iframe content
                        const style = iframe.contentWindow.document.createElement('style');
                        style.textContent = `
                          * { 
                            user-select: text !important;
                            -webkit-user-select: text !important;
                          }
                          body {
                            user-select: text !important;
                            -webkit-user-select: text !important;
                          }
                        `;
                        iframe.contentWindow.document.head.appendChild(style);
                      } catch (error) {
                        console.log('Cannot access iframe content due to cross-origin restrictions');
                      }
                    }
                  }}
                />
                <div className="protection-overlay" />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-zinc-800 bg-zinc-900/95 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  <p className="text-zinc-400 text-sm text-center sm:text-left">
                    This is a preview only. Download and screenshots are disabled.
                  </p>
                </div>
                <p className="text-zinc-500 text-xs text-center sm:text-right">
                  For security purposes, copying and printing are restricted.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
