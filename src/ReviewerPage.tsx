import { FormEvent, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchReviewerInvite, submitReviewerFeedback, type ApiResult, type ReviewerInviteResult } from './api'
import {
  coreRatingGroups,
  focusModules,
  inspectorRatingGroup,
  manuscriptRatingGroup,
  materialsReviewed,
  readinessOptions,
  redFlags,
  reviewerTypes,
  systemItems,
  systemStatuses,
  type RatingGroup,
} from './reviewContent'
import './review.css'

type ReviewPath = 'quick' | 'focused' | 'deep'

type ReviewState = {
  reviewerTypes: string[]
  materials: string[]
  focusModules: string[]
  ratings: Record<string, string>
  systems: Record<string, string>
  redFlags: string[]
  texts: Record<string, string>
  historyReplace: string
  readiness: string
  confidence: string
  website: string
}

const emptyReview: ReviewState = {
  reviewerTypes: [],
  materials: [],
  focusModules: [],
  ratings: {},
  systems: {},
  redFlags: [],
  texts: {},
  historyReplace: '',
  readiness: '',
  confidence: '',
  website: '',
}

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

function RatingSection({
  group,
  ratings,
  onChange,
  required = true,
}: {
  group: RatingGroup
  ratings: Record<string, string>
  onChange: (id: string, value: string) => void
  required?: boolean
}) {
  return (
    <section className="review-section">
      <h2>{group.title}</h2>
      {group.description && <p className="section-help">{group.description}</p>}
      <div className="rating-table" role="group" aria-label={group.title}>
        <div className="rating-scale-help">1 = serious problem · 2 = weak · 3 = workable · 4 = strong · 5 = excellent · N/A = not enough information</div>
        {group.items.map((item) => (
          <label className="rating-row" key={item.id}>
            <span>{item.label}</span>
            <select
              required={required}
              aria-label={`${item.label} rating`}
              value={ratings[item.id] ?? ''}
              onChange={(event) => onChange(item.id, event.target.value)}
            >
              <option value="">Rate</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="NA">N/A</option>
            </select>
          </label>
        ))}
      </div>
    </section>
  )
}

function TextQuestion({
  id,
  label,
  value,
  onChange,
  required = false,
  rows = 3,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  rows?: number
}) {
  return (
    <div className="review-text-question">
      <label htmlFor={`review-${id}`}>{label}</label>
      <textarea
        id={`review-${id}`}
        required={required}
        maxLength={4000}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default function ReviewerPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [code, setCode] = useState(searchParams.get('code') ?? '')
  const [invite, setInvite] = useState<ReviewerInviteResult | null>(null)
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'checking' | 'valid' | 'error'>('idle')
  const [path, setPath] = useState<ReviewPath | null>(null)
  const [review, setReview] = useState<ReviewState>(emptyReview)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitResult, setSubmitResult] = useState<ApiResult | null>(null)

  const hasInspectorPerspective = useMemo(
    () => review.reviewerTypes.some((value) => ['gm', 'designer', 'reviewer'].includes(value)) || review.focusModules.includes('inspector'),
    [review.reviewerTypes, review.focusModules],
  )

  const verify = async (event?: FormEvent) => {
    event?.preventDefault()
    const cleaned = code.trim()
    if (!cleaned) return
    setVerifyStatus('checking')
    const result = await fetchReviewerInvite(cleaned)
    setInvite(result)
    setVerifyStatus(result.ok ? 'valid' : 'error')
    if (result.ok) {
      setSearchParams({ code: cleaned })
    }
  }

  const setText = (id: string, value: string) => {
    setReview((current) => ({ ...current, texts: { ...current.texts, [id]: value } }))
  }

  const setRating = (id: string, value: string) => {
    setReview((current) => ({ ...current, ratings: { ...current.ratings, [id]: value } }))
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!path || !invite?.ok || submitStatus === 'submitting') return

    setSubmitStatus('submitting')
    setSubmitResult(null)

    const result = await submitReviewerFeedback({
      invite_code: code.trim(),
      path_selected: path,
      reviewer_types: review.reviewerTypes,
      materials_reviewed: review.materials,
      website: review.website,
      answers: {
        confidence: review.confidence,
        focus_modules: review.focusModules,
        ratings: review.ratings,
        system_statuses: review.systems,
        history_replace: review.historyReplace,
        red_flags: review.redFlags,
        ...review.texts,
        readiness: review.readiness,
      },
    })

    setSubmitResult(result)
    setSubmitStatus(result.ok ? 'success' : 'error')
  }

  if (submitStatus === 'success') {
    return (
      <main className="review-page">
        <section className="review-complete">
          <p className="eyebrow">Private TCC review</p>
          <h1>Review recorded.</h1>
          <p>
            Thank you for criticizing the game. Your comments are being treated as development feedback, not as an endorsement or testimonial.
          </p>
          <Link className="button button-primary" to="/">Return to TCC</Link>
        </section>
      </main>
    )
  }

  if (verifyStatus !== 'valid' || !invite?.ok) {
    return (
      <main className="review-page">
        <section className="review-gate">
          <p className="eyebrow">TCC private review</p>
          <h1>Criticism, not endorsement.</h1>
          <p className="lede">
            Invited reviewers can use this room for a short guided review, a focused system review, or a deeper manuscript critique. You are not being asked to promote TCC or provide a testimonial.
          </p>

          <form className="invite-form" onSubmit={verify}>
            <label htmlFor="review-code">Reviewer invitation code</label>
            <div className="invite-row">
              <input id="review-code" required maxLength={64} value={code} onChange={(event) => setCode(event.target.value)} />
              <button className="button button-primary" type="submit" disabled={verifyStatus === 'checking'}>
                {verifyStatus === 'checking' ? 'Checking…' : 'Open review room'}
              </button>
            </div>
          </form>

          {verifyStatus === 'error' && (
            <div className="form-error" role="alert">
              <strong>Invitation not verified.</strong>
              <p>{invite?.message ?? 'Check the code and try again.'}</p>
            </div>
          )}

          <div className="review-public-option">
            <h2>Not an invited reviewer?</h2>
            <p>You can still experience the public TCC prototype and give post-demo feedback.</p>
            <Link className="button button-secondary" to="/discover">Try the TCC experience</Link>
          </div>
        </section>
      </main>
    )
  }

  if (!path) {
    return (
      <main className="review-page">
        <section className="review-paths">
          <p className="eyebrow">Private review · {invite.tcc_version ?? 'current development build'}</p>
          <h1>{invite.reviewer_name ? `Welcome, ${invite.reviewer_name}.` : 'Choose how deep you want to go.'}</h1>
          {invite.expertise && <p className="reviewer-context">Invited perspective: {invite.expertise}</p>}
          {invite.already_submitted && <p className="review-warning">A review has already been submitted with this invitation. You can submit another pass, but it will be stored as a separate review.</p>}

          <div className="path-grid">
            <article>
              <p className="eyebrow">Shortest path</p>
              <h2>Quick review</h2>
              <p>Experience the portal or review what you have already seen, then complete the core standardized critique.</p>
              <button className="button button-primary" type="button" onClick={() => setPath('quick')}>Choose quick review</button>
            </article>
            <article>
              <p className="eyebrow">30–60 minutes</p>
              <h2>Focused review</h2>
              <p>Use the core critique plus targeted system questions for the areas you know best.</p>
              <button className="button button-primary" type="button" onClick={() => setPath('focused')}>Choose focused review</button>
            </article>
            <article>
              <p className="eyebrow">Deep review</p>
              <h2>Manuscript critique</h2>
              <p>Use the full rubric, including Inspector burden and book/information design.</p>
              <p className="path-note">The current manuscript asset must be attached to the portal before this path is sent to outside reviewers.</p>
              <button className="button button-primary" type="button" onClick={() => setPath('deep')}>Choose deep review</button>
            </article>
          </div>

          <div className="review-demo-link">
            <Link to="/experience">Open The Missing Name guided demo</Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="review-page">
      <form className="review-form" onSubmit={submit}>
        <header className="review-form-header">
          <p className="eyebrow">{path === 'quick' ? 'Quick' : path === 'focused' ? 'Focused' : 'Deep'} TCC review</p>
          <h1>Tell us where TCC fails.</h1>
          <p className="lede">
            Use N/A when you did not see enough material to judge something. Direct criticism is more useful than encouragement.
          </p>
          <button className="text-button" type="button" onClick={() => setPath(null)}>Change review path</button>
        </header>

        <section className="review-section">
          <h2>Your perspective</h2>
          <fieldset className="review-check-group">
            <legend>Which descriptions fit you? Choose any that apply.</legend>
            <div className="review-check-grid">
              {reviewerTypes.map(([value, label]) => (
                <label key={value}>
                  <input
                    type="checkbox"
                    checked={review.reviewerTypes.includes(value)}
                    onChange={() => setReview({ ...review, reviewerTypes: toggleValue(review.reviewerTypes, value) })}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="review-check-group">
            <legend>What did you actually review?</legend>
            <div className="review-check-grid">
              {materialsReviewed.map(([value, label]) => (
                <label key={value}>
                  <input
                    type="checkbox"
                    checked={review.materials.includes(value)}
                    onChange={() => setReview({ ...review, materials: toggleValue(review.materials, value) })}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="confidence-row">
            <span>How confident are you in this review based on what you saw?</span>
            <select required value={review.confidence} onChange={(event) => setReview({ ...review, confidence: event.target.value })}>
              <option value="">Choose</option>
              <option value="1">1 · very limited exposure</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 · very confident</option>
            </select>
          </label>
        </section>

        {coreRatingGroups.map((group) => (
          <RatingSection key={group.id} group={group} ratings={review.ratings} onChange={setRating} />
        ))}

        <section className="review-section">
          <h2>Comprehension and friction</h2>
          <TextQuestion id="one_sentence_tcc" label="In one sentence, what do you think TCC is?" required value={review.texts.one_sentence_tcc ?? ''} onChange={(value) => setText('one_sentence_tcc', value)} />
          <TextQuestion id="strongest_premise" label="What is the strongest part of the premise?" required value={review.texts.strongest_premise ?? ''} onChange={(value) => setText('strongest_premise', value)} />
          <TextQuestion id="weakest_premise" label="What is the weakest or hardest-to-believe part of the premise?" required value={review.texts.weakest_premise ?? ''} onChange={(value) => setText('weakest_premise', value)} />
          <TextQuestion id="first_confusion" label="Where did you first become confused?" value={review.texts.first_confusion ?? ''} onChange={(value) => setText('first_confusion', value)} />
          <TextQuestion id="reread" label="What did you have to reread?" value={review.texts.reread ?? ''} onChange={(value) => setText('reread', value)} />
          <TextQuestion id="missing_example" label="What needed an example but did not have one?" value={review.texts.missing_example ?? ''} onChange={(value) => setText('missing_example', value)} />
          <TextQuestion id="most_fun" label="What looked or felt the most fun?" required value={review.texts.most_fun ?? ''} onChange={(value) => setText('most_fun', value)} />
          <TextQuestion id="felt_like_work" label="What looked or felt like work?" required value={review.texts.felt_like_work ?? ''} onChange={(value) => setText('felt_like_work', value)} />

          <label className="select-question">
            <span>If you removed the real history and replaced it with fictional lore, would this still basically be the same game?</span>
            <select required value={review.historyReplace} onChange={(event) => setReview({ ...review, historyReplace: event.target.value })}>
              <option value="">Choose</option>
              <option value="Yes">Yes</option>
              <option value="Mostly">Mostly</option>
              <option value="Partly">Partly</option>
              <option value="No">No</option>
            </select>
          </label>
        </section>

        {(path === 'focused' || path === 'deep') && (
          <section className="review-section">
            <h2>Systems</h2>
            {path === 'focused' && (
              <fieldset className="review-check-group">
                <legend>Which areas are you focusing on?</legend>
                <div className="review-check-grid">
                  {focusModules.map(([value, label]) => (
                    <label key={value}>
                      <input type="checkbox" checked={review.focusModules.includes(value)} onChange={() => setReview({ ...review, focusModules: toggleValue(review.focusModules, value) })} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="system-grid">
              {systemItems.map((system) => (
                <label key={system}>
                  <span>{system}</span>
                  <select value={review.systems[system] ?? ''} onChange={(event) => setReview({ ...review, systems: { ...review.systems, [system]: event.target.value } })}>
                    <option value="">Not rated</option>
                    {systemStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </label>
              ))}
            </div>

            <TextQuestion id="protect_mechanic" label="Which ONE mechanic would you protect from major redesign?" value={review.texts.protect_mechanic ?? ''} onChange={(value) => setText('protect_mechanic', value)} />
            <TextQuestion id="redesign_mechanic" label="Which ONE mechanic would you redesign first?" value={review.texts.redesign_mechanic ?? ''} onChange={(value) => setText('redesign_mechanic', value)} />
          </section>
        )}

        {(path === 'deep' || hasInspectorPerspective) && (
          <RatingSection group={inspectorRatingGroup} ratings={review.ratings} onChange={setRating} required={path === 'deep'} />
        )}

        {path === 'deep' && (
          <>
            <RatingSection group={manuscriptRatingGroup} ratings={review.ratings} onChange={setRating} />
            <section className="review-section">
              <h2>Manuscript surgery</h2>
              <TextQuestion id="chapter_rewrite" label="Which chapter needs the most rewriting?" value={review.texts.chapter_rewrite ?? ''} onChange={(value) => setText('chapter_rewrite', value)} />
              <TextQuestion id="chapter_best" label="Which chapter is closest to publication quality?" value={review.texts.chapter_best ?? ''} onChange={(value) => setText('chapter_best', value)} />
              <TextQuestion id="add_example" label="Where should we add an example?" value={review.texts.add_example ?? ''} onChange={(value) => setText('add_example', value)} />
              <TextQuestion id="remove_repetition" label="Where should we remove explanation because it is becoming repetitive?" value={review.texts.remove_repetition ?? ''} onChange={(value) => setText('remove_repetition', value)} />
            </section>
          </>
        )}

        {hasInspectorPerspective && (
          <section className="review-section">
            <h2>Inspector stop point</h2>
            <TextQuestion id="stop_running" label="What would stop you from running TCC?" value={review.texts.stop_running ?? ''} onChange={(value) => setText('stop_running', value)} />
          </section>
        )}

        <section className="review-section">
          <h2>Red flags</h2>
          <p className="section-help">Select anything you encountered. Then tell us where and why.</p>
          <div className="review-check-grid">
            {redFlags.map((flag) => (
              <label key={flag}>
                <input type="checkbox" checked={review.redFlags.includes(flag)} onChange={() => setReview({ ...review, redFlags: toggleValue(review.redFlags, flag) })} />
                <span>{flag}</span>
              </label>
            ))}
          </div>
          <TextQuestion id="red_flag_details" label="Where and why?" value={review.texts.red_flag_details ?? ''} onChange={(value) => setText('red_flag_details', value)} rows={5} />
        </section>

        <section className="review-section final-review-section">
          <h2>Force the priorities.</h2>
          <TextQuestion id="top_three" label="Pick the THREE things TCC most needs before serious public playtesting." required value={review.texts.top_three ?? ''} onChange={(value) => setText('top_three', value)} rows={5} />
          <TextQuestion id="one_fix" label="If we could fix only ONE thing, what should it be?" required value={review.texts.one_fix ?? ''} onChange={(value) => setText('one_fix', value)} />
          <TextQuestion id="do_not_change" label="What should we absolutely NOT change?" required value={review.texts.do_not_change ?? ''} onChange={(value) => setText('do_not_change', value)} />

          <label className="select-question">
            <span>Current state of TCC</span>
            <select required value={review.readiness} onChange={(event) => setReview({ ...review, readiness: event.target.value })}>
              <option value="">Choose</option>
              {readinessOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
        </section>

        <div className="honeypot" aria-hidden="true">
          <label htmlFor="review-website">Website</label>
          <input id="review-website" tabIndex={-1} autoComplete="off" value={review.website} onChange={(event) => setReview({ ...review, website: event.target.value })} />
        </div>

        {submitStatus === 'error' && (
          <div className="form-error" role="alert">
            <strong>Review not sent.</strong>
            <p>{submitResult?.message ?? 'Please try again.'}</p>
          </div>
        )}

        <div className="review-submit-area">
          {review.reviewerTypes.length === 0 && <p>Choose at least one reviewer perspective before submitting.</p>}
          <button className="button button-primary" type="submit" disabled={submitStatus === 'submitting' || review.reviewerTypes.length === 0}>
            {submitStatus === 'submitting' ? 'Saving review…' : 'Submit private critique'}
          </button>
          <p>Your criticism will not be presented as an endorsement or testimonial without separate permission.</p>
        </div>
      </form>
    </main>
  )
}
