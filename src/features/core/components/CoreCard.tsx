interface Props {
  additionalClasses?: string;
  Title?: () => React.ReactNode;
  Content?: () => React.ReactNode;
  Actions?: () => React.ReactNode;
  Image?: () => React.ReactNode;
  OverImage?: () => React.ReactNode;
}

function CoreCard({
  additionalClasses,
  Title,
  Content,
  Actions,
  Image,
  OverImage,
}: Props) {
  return (
    <div
      className={`card bg-base-100 w-96 shadow-sm ${additionalClasses || ""}`}
    >
      {Image && (
        <figure className="relative">
          <Image />
          {OverImage && <OverImage />}
        </figure>
      )}
      <div className="card-body">
        {Title && <h2 className="card-title">{Title()}</h2>}
        {Content && <p>{Content()}</p>}
        {Actions && <div className="card-actions">{Actions()}</div>}
      </div>
    </div>
  );
}

export default CoreCard;
