export default function MemberDetailPage({ params }: { params: { memberId: string } }) {
  return <div>Member Detail Page for {params.memberId}</div>;
}
